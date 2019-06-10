<?php

namespace CodeShopping\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use CodeShopping\Firebase\FirebaseSync;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    use FirebaseSync;

    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Create new Customer
     *
     * @param array $data
     * @return void
     */
    public static function createCustomer(array $data)
    {
        try {
            UserProfile::uploadPhoto($data['photo']);

            \DB::beginTransaction();
            $user = self::createCustomerUser($data);
            UserProfile::saveProfile($user, $data);
            \DB::commit();
        } catch (\Exception $e) {
            UserProfile::deleteFile($data['photo']);
            \DB::rollback();
            throw $e;
        }

        return $user;
    }

    /**
     * Create customer user
     *
     * @param array $data
     * @return User
     */
    private static function createCustomerUser(array $data): User
    {
        $data['password'] = bcrypt(str_random(16));
        $user = self::create($data);
        $user->role = self::ROLE_CUSTOMER;
        return $user;
    }

    public function updateWithProfile(array $data): self
    {
        try {
            if(isset($data['photo'])) {
                UserProfile::uploadPhoto($data['photo']);
            }

            \DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            \DB::commit();
        } catch (\Exception $e) {
            if(isset($data['photo'])) {
                UserProfile::deleteFile($data['photo']);
            }
            \DB::rollback();
            throw $e;
        }

        return $this;
    }

    public function fill(array $attributes)
    {
        !isset($attributes['password']) ?: $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number
            ]
        ];
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    protected function syncFirebaseCreate()
    {
        $this->syncFirebaseSetCustom();
    }

    protected function syncFirebaseUpdate()
    {
        $this->syncFirebaseSetCustom();
    }

    protected function syncFirebaseRemove()
    {
        $this->syncFirebaseSetCustom();
    }

    public function syncFirebaseSetCustom()
    {
        $this->profile->refresh();
        
        if ($this->profile->firebase_uid) {
            $database = $this->getFirebaseDatabase();
            $path = "users/".$this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name' => $this->name,
                'photo_url' => $this->profile->photo_url_base,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}
