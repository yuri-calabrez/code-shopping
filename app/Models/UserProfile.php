<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use CodeShopping\Firebase\FirebaseSync;

class UserProfile extends Model
{
    use FirebaseSync;

    const BASE_PATH = 'app/public';
    const DIR_USERS  = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS."/photos";

    const USER_PHOTO_PATH = self::BASE_PATH.'/'.self::DIR_USER_PHOTO;

    protected $fillable = ['phone_number', 'photo'];

    /**
     * Create phone number token to change
     *
     * @param UserProfile $profile
     * @param string $phoneNumber
     * @return string
     */
    public static function createTokenToChangePhoneNumber(UserProfile $profile, string $phoneNumber): string
    {
        $token = base64_encode($phoneNumber);
        $profile->phone_number_token_to_change = $token;
        $profile->save();
        return $token;
    }

    /**
     * Update customer phone number
     *
     * @param string $token
     * @return self
     */
    public static function updatePhoneNumber(string $token): self
    {
        $profile = self::where('phone_number_token_to_change', $token)->firstOrFail();
        $phoneNumber = base64_decode($token);
        $profile->phone_number = $phoneNumber;
        $profile->phone_number_token_to_change = null;
        $profile->save();

        return $profile;
    }

    /**
     * Save customer profile
     *
     * @param User $user
     * @param array $data
     * @return UserProfile
     */
    public static function saveProfile(User $user, array $data): UserProfile
    {
        if(array_key_exists('photo', $data)) {
            self::deletePhoto($user->profile);
            $data['photo'] = self::getPhotoHashName($data['photo']);
        }
        
        $user->profile->fill($data)->save();
        return $user->profile;
    }

    public static function deleteFile(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }

        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";

        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
    }

    /**
     * Get photo hash name
     *
     * @param UploadedFile $photo
     * @return void
     */
    private static function getPhotoHashName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

    /**
     * Remove old photo if exists
     *
     * @param UserProfile $userProfile
     * @return void
     */
    private static function deletePhoto(UserProfile $userProfile)
    {
        if (!$userProfile->photo) {
            return;
        }

        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$userProfile->photo}");
    }

    /**
     * Return photo Path
     *
     * @return string
     */
    public static function photoPath(): string
    {
        return storage_path(self::USER_PHOTO_PATH);
    }

    /**
     * Upload customer photo
     *
     * @param UploadedFile $photo
     * @return void
     */
    public static function uploadPhoto(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }

        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * Return photo dir
     *
     * @return string
     */
    public static function photoDir(): string
    {
        return self::DIR_USER_PHOTO;
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset("storage/{$this->photo_url_base}") : $this->photo_url_base;
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return $this->photo ? "{$path}/{$this->photo}" : 'https://www.gravatar.com/avatar/nouser.jpg';
    }

    protected function syncFirebaseSet()
    {
        $this->user->syncFirebaseSetCustom();
    }
}
