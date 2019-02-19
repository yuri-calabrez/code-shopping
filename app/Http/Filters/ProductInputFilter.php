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

    protected function applySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }

    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('product_inputs.created_at', $order);
    }

    /**
     *
     * @param \Illuminate\Database\Query\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($query)
    {
        $query = $query
            ->select('product_inputs.*')
            ->join('products', 'products.id', '=', 'product_inputs.product_id');
        return parent::apply($query);
    }
}