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
        return response()->json(new ProductPhotoCollection($photos, $product), 201);
    }

    
    public function show(Product $product, ProductPhoto $photo)
    {
        $this->productHasPhoto($product, $photo);
        return new ProductPhotoResource($photo);
    }


    
    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        $this->productHasPhoto($product, $photo);
        $photo = $photo->updatePhoto($request->file('photo'));
        return new ProductPhotoResource($photo);
    }

   
    public function destroy(Product $product, ProductPhoto $photo)
    {
        $this->productHasPhoto($product, $photo);
        $photo->deletePhoto();
        return response()->json([], 204);
    }

    private function productHasPhoto(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
    }
}
