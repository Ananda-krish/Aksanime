<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategorySaveRequest;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function create(ProductCategorySaveRequest $request) {
        $input = $request->validated();
        ProductCategory::create($input);
        return response()->json(['message' => 'Category saved successfully.'], 201);
    }
    public function list() {
        $categories = ProductCategory::paginate(10);
        return response()->json($categories);
    }

    public function delete($id)
    {

            // Find the category
            $category = ProductCategory::findOrFail($id);
$category->delete();
return response()->json(['message' => 'Category deleted successfully.'], 201);

    }
    public function show($id){
        $category=ProductCategory::findOrFail($id);
        return response()->json($category);
    }
    public function update(ProductCategorySaveRequest $request, $id)
{

    $category = ProductCategory::findOrFail($id);


    $validatedData = $request->validated();


    $category->update($validatedData);


    return response()->json(['message' => 'Category updated successfully.'], 200);
}
}
