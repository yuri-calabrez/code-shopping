<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\Category;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Http\Filters\CategoryFilter;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = app(CategoryFilter::class);
        $filterQuery = Category::filtered($filter);
        //$categories = $request->has('all') ? Category::all() : Category::paginate(5);
        $categories = $filterQuery->paginate(5);
        return CategoryResource::collection($categories);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param CodeShopping\Http\Requests\CategoryRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CodeShopping\Http\Requests\CategoryRequest $request
     * @param  \CodeShopping\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response([], 204);
    }
}
