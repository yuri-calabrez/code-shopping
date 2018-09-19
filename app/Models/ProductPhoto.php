<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    const DIR_PRODUCTS = 'products';
    const BASE_PATH = 'app/public';

    const PRODUCTS_PATH = self::BASE_PATH.'/'.self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    public static function photosPath($productId)
    {
        return storage_path(self::PRODUCTS_PATH."/".$productId);
    }
}
