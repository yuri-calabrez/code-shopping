<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOutput extends Model
{
    protected $fillable = ['product_id', 'amount'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
