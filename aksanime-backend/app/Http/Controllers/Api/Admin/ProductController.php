<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductSaveRequest;
use App\Models\AnimeCard;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Exception;
class ProductController extends Controller
{
    public function store(ProductSaveRequest $request)
    {
        try {
            $input = $request->validated();

            if ($request->hasFile('image_url')) {
                $file = $request->file('image_url');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::random(6) . '-' . time() . '.' . $extension;
                $path = $file->storeAs('anime-images', $filename, 'public');
                $input['image_url'] = '/storage/' . $path;
            }

            $animeCard =Product::create($input);

            return response()->json([
                'message' => 'Anime card created successfully.',
                'data' => $animeCard->load('ProductCategory','AnimeCard')
            ], 201);
        } catch (Exception $e) {
            Log::error('Error creating anime card: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create anime card.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * List all anime cards with pagination.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function list(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $animeCards =Product::with('ProductCategory','AnimeCard')
                ->latest()
                ->paginate($perPage);

            return response()->json($animeCards);
        } catch (Exception $e) {
            Log::error('Error listing anime cards: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch anime cards.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an anime card.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        try {
            $animeCard =Product::findOrFail($id);

            // Delete associated image if exists
            if ($animeCard->image_url) {
                $path = str_replace('/storage/', '', $animeCard->image_url);
                Storage::disk('public')->delete($path);
            }

            $animeCard->delete();

            return response()->json([
                'message' => 'Anime card deleted successfully.'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error deleting anime card: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete anime card.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific anime card.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */public function show($id){

$product=Product::with('AnimeCard','ProductCategory')->findOrFail($id);
$categories =ProductCategory::all();
$animecard =AnimeCard::all();
return response()->json([$categories,$product,$animecard]);
}

    /**
     * Update an anime card.
     *
     * @param ProductSaveRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProductSaveRequest $request, $id)
{
    try {
        Log::info('Updating anime card ID: ' . $id, $request->validated());

        $animeCard =Product::findOrFail($id);
        $input = $request->validated();

        if ($request->hasFile('image_url')) {
            // Delete old image if exists
            if ($animeCard->image_url) {
                $oldPath = str_replace('/storage/', '', $animeCard->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            // Store new image
            $file = $request->file('image_url');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::random(6) . '-' . time() . '.' . $extension;
            $path = $file->storeAs('anime-images', $filename, 'public');
            $input['image_url'] = '/storage/' . $path;
        }

        $animeCard->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Anime card updated successfully.',
            'data' => $animeCard->fresh()->load('category')
        ], 200);
    } catch (Exception $e) {
        Log::error('Error updating anime card: ' . $e->getMessage());
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to update anime card.',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function getProductsByAnimeCard($animeCardId)
{
    // Find the AnimeCard with the given ID
    $animeCard = AnimeCard::findOrFail($animeCardId);

    // Get all products related to this AnimeCard
    $products = $animeCard->products;

    // Return the products in the response
    return response()->json($products);
}
}

