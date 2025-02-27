<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnimiCategorySaveRequest;
use App\Models\AnimeCategory;
use Illuminate\Http\Request;

class AnimiCategoryController extends Controller
{
    public function create(AnimiCategorySaveRequest $request) {
        $input = $request->validated();
        AnimeCategory::create($input);
        return response()->json(['message' => 'Category saved successfully.'], 201);
    }
    public function list() {
        $categories = AnimeCategory::paginate(10);
        return response()->json($categories);
    }

    public function delete($id)
    {

            // Find the category
            $category = AnimeCategory::findOrFail($id);
$category->delete();
return response()->json(['message' => 'Category deleted successfully.'], 201);

    }
    public function show($id){
        $category=AnimeCategory::findOrFail($id);
        return response()->json($category);
    }
    public function update(AnimiCategorySaveRequest $request, $id)
{

    $category = AnimeCategory::findOrFail($id);


    $validatedData = $request->validated();


    $category->update($validatedData);

   
    return response()->json(['message' => 'Category updated successfully.'], 200);
}

}
