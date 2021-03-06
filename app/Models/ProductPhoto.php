<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Collection;

class ProductPhoto extends Model
{
    const DIR_PRODUCTS = 'products';
    const BASE_PATH = 'app/public';

    const PRODUCTS_PATH = self::BASE_PATH.'/'.self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

    public static function photosPath($productId)
    {
        return storage_path(self::PRODUCTS_PATH."/".$productId);
    }

    public static function createWithPhotoFiles(int $productId, array $files): Collection
    {
        try {
            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotoModels($productId, $files);
            \DB::commit();
            return new Collection($photos);
        } catch (\Exception $e) {
            \DB::rollBack();
            self::deleteFiles($productId, $files);
            throw $e;
        }
    }

    public function updatePhoto(UploadedFile $file)
    {
        try {
            self::uploadFiles($this->product_id, [$file]);
            \DB::beginTransaction();
            $this->deleteSingleFile();
            $this->file_name = $file->hashName();
            $this->save();
            \DB::commit();
            return $this;
        } catch (\Exception $e) {
            \DB::rollBack();
            self::deleteFiles($productId, [$file]);
            throw $e;
        }
    }

    public function deletePhoto(): bool
    {
        try {
            \DB::beginTransaction();
            $this->deleteSingleFile();
            $result = $this->delete();
            \DB::commit();
            return $result;
        } catch (\Exception $e) {
            \DB::rollBack();
            throw $e;
        }
    }

    public function deleteSingleFile()
    {
        $path = self::photosPath($this->product_id);
        $photoPath = "{$path}/{$this->file_name}";
        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
    }

    private static function deleteFiles(int $productId, array $files)
    {
        /**@var UploadedFile $file */
        foreach ($files as $file) {
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                \File::delete($photoPath);
            }
        }
    }

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /**@var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    private static function createPhotoModels(int $productId, array $files): array
    {
        $photos = [];
        /**@var UploadedFile $file */
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir(int $productId): string
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/$productId";
    }
}
