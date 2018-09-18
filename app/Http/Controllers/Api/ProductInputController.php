<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductInput;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate();
        return ProductInputResource::collection($inputs);
    }

    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());
        return response()->json(new ProductInputResource($input), 201);
    }
}
