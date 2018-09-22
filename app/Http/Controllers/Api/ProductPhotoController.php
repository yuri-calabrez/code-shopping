<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Requests\ProductPhotoRequest;

class ProductPhotoController extends Controller
{
   
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    
    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotoFiles($product->id, $request->photos);
        return new ProductPhotoCollection($photos, $product);
    }

    
    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
        return new ProductPhotoResource($photo);
    }


    
    public function update(Request $request, $id)
    {
        //
    }

   
    public function destroy($id)
    {
        //
    }
}
