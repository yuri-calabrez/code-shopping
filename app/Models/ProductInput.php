<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInput extends Model
{
    protected $fillable = ['product_id', 'amount'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
