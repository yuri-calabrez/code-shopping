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
        return $this->belongsTo(Product::class);
    }

    public static function photosPath($productId)
    {
        return storage_path(self::PRODUCTS_PATH."/".$productId);
    }

    public static function createWithPhotoFiles(int $productId, array $files): Collection
    {
        self::uploadFiles($productId, $files);
        $photos = self::createPhotoModels($productId, $files);
        return new Collection($photos);
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
