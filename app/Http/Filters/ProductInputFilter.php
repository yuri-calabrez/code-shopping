<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductInputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'product_name', 'amount', 'created_at'];

    protected function applySearch($value)
    {
        $this->query
            ->where('name', 'LIKE', "%$value%");
    }
}