<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use CodeShopping\Firebase\FirebaseSync;
use Fico7489\Laravel\Pivot\Traits\PivotEventTrait;

class ChatGroup extends Model
{
    use SoftDeletes, FirebaseSync, PivotEventTrait;

    const BASE_PATH = 'app/public';
    const DIR_CHAT_GROUPS  = 'chat_groups';
    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH.'/'.self::DIR_CHAT_GROUPS;

    protected $fillable = [
        'name',
        'photo'
    ];

    protected $dates = ['deleted_at'];


    /**
     * Create new Chat Group
     *
     * @param array $data
     * @return self
     */
    public static function createWithPhoto(array $data): self
    {
        try {
            self::uploadPhoto($data['photo']);
            $data['photo'] = $data['photo']->hashName();

            \DB::beginTransaction();
            $chatGroup = self::create($data);
            \DB::commit();
        } catch (\Exception $e) {
            self::deleteFile($data['photo']);
            \DB::rollback();
            throw $e;
        }

        return $chatGroup;
    }

    /**
     * Update Chat Group
     *
     * @param array $data
     * @return self
     */
    public function updateWithPhoto(array $data): self
    {
        try {
            if(isset($data['photo'])) {
                self::uploadPhoto($data['photo']);
                $this->deletePhoto();
                $data['photo'] = $data['photo']->hashName();
            }

            \DB::beginTransaction();
            $this->fill($data)->save();
            \DB::commit();
        } catch (\Exception $e) {
            if(isset($data['photo'])) {
                self::deleteFile($data['photo']);
            }
            \DB::rollback();
            throw $e;
        }

        return $this;
    }

    private static function deleteFile(UploadedFile $photo)
    {

        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";

        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
    }

    /**
     * Remove old photo if exists
     *
     * @param UserProfile $userProfile
     * @return void
     */
    public function deletePhoto()
    {
        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }

    /**
     * Return photo Path
     *
     * @return string
     */
    private static function photoPath(): string
    {
        return storage_path(self::CHAT_GROUP_PHOTO_PATH);
    }

    /**
     * Upload customer photo
     *
     * @param UploadedFile $photo
     * @return void
     */
    private static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * Return photo dir
     *
     * @return string
     */
    private static function photoDir(): string
    {
        return self::DIR_CHAT_GROUPS;
    }

    public function users() 
    {
        return $this->belongsToMany(User::class);
    }

    protected function syncFirebaseRemove()
    {
        $this->syncFirebaseSet();
    }

    protected function syncFirebaseSet()
    {
        $data = $this->toArray();
        unset($data['photo']);
        $data['photo_url'] = $this->photo_url_base;
        $this->getModelReference()->set($data);
    }

    public function getPhotoUrlAttribute()
    {
        return asset("storage/{$this->photo_url_base}");
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return "{$path}/{$this->photo}";
    }

    protected function syncPivotAttached($model, $relationName, $pivotIds, $pivotIdsAttribute)
    {
        $users = User::whereIn('id', $pivotIds)->get();
        $data = [];

        foreach($users as $user) {
            $data["chat_groups/{$model->id}/users/{$user->profile->firebase_uid}"] = true;
        }
        
        $this->getFirebaseDatabase()->getReference()->update($data);
    }

}
