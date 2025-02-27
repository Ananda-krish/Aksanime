<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnimeCardSaveRequest;
use App\Models\AnimeCard;
use App\Models\AnimeCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Exception;
class AnimeCardController extends Controller
{
    public function store(AnimeCardSaveRequest $request)
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

            $animeCard = AnimeCard::create($input);

            return response()->json([
                'message' => 'Anime card created successfully.',
                'data' => $animeCard->load('category')
            ], 201);
        } catch (Exception $e) {
            Log::error('Error creating anime card: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create anime card.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function list(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $animeCards = AnimeCard::with('category')
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


    public function delete($id)
    {
        try {
            $animeCard = AnimeCard::findOrFail($id);

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


     public function show($id){
$product=AnimeCard::findOrFail($id);
$categories = AnimeCategory::all();
return response()->json([$categories,$product]);
}


    public function update(AnimeCardSaveRequest $request, $id)
{
    try {
        Log::info('Updating anime card ID: ' . $id, $request->validated());

        $animeCard = AnimeCard::findOrFail($id);
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
public function searchproduct(Request $request) {
    $search = $request->search;

    if($search){
        $animecard = AnimeCard::where('title', 'like', '%' . $search . '%')
            ->paginate(2);
    } else {
        $animecard = AnimeCard::paginate(5);
    }

    return response()->json($animecard);
}
}
