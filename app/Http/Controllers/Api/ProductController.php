<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\Product;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        return ProductResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \CodeShopping\Http\Requests\ProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \CodeShopping\Http\Requests\ProductRequest  $request
     * @param  \CodeShopping\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response([], 204);
    }

    private function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if ($request->get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}
