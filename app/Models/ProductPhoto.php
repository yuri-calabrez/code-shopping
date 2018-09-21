<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

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

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /**@var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("umapasta/{$path}/{$this->file_name}");
    }

    public static function photosDir(int $productId): string
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/$productId";
    }
}
