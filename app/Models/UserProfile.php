<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_USERS  = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS."/photos";

    const USER_PHOTO_PATH = self::BASE_PATH.'/'.self::DIR_USER_PHOTO;

    protected $fillable = ['phone_number', 'photo'];

    /**
     * Save customer profile
     *
     * @param User $user
     * @param array $data
     * @return UserProfile
     */
    public static function saveProfile(User $user, array $data): UserProfile
    {
        $data['photo'] = self::getPhotoHashName($data['photo']);
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
}
