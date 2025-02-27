<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EpisodeSaveRequest;
use App\Models\AnimeCard;
use App\Models\Episode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class EpisodeController extends Controller
{
    public function store(EpisodeSaveRequest $request)
    {
        try {
            $input = $request->validated();

            if ($request->hasFile('video_url')) {
                $file = $request->file('video_url');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('AnimeCardvideo', $filename, 'public');
                $input['video_url'] = $path;
            }

            $Episode = Episode::create($input);

            return response()->json([
                'message' => 'AnimeAnimeCard video created successfully.',
                'data' => $Episode
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error savingAnimeCard video: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error savingAnimeCard video: ' . $e->getMessage()
            ], 500);
        }
    }
        public function list()
        {
            $Episode = Episode::with('AnimeCard')->paginate(10);
            return response()->json($Episode);
        }

        public function delete($id)
        {
            $Episode = Episode::findOrFail($id);

            if ($Episode->video_url) {
                // Delete the file from storage
                Storage::disk('public')->delete($Episode->video_url);
            }

            $Episode->delete();
            return response()->json(['message' => 'AnimeAnimeCard deleted successfully.'], 200);
        }

        public function show($id)
        {
            $Episode = Episode::with('AnimeCard')->findOrFail($id);
            $AnimeAnimeCard =AnimeCard::all();
            return response()->json(['AnimeAnimeCard' => $AnimeAnimeCard, 'Episode' => $Episode]);
        }

        public function update(EpisodeSaveRequest $request, $id) {
            Log::info('Received data forAnimeCard update:', $request->all());
            $Episode = Episode::findOrFail($id);
            $input = $request->validated();

            if ($request->hasFile('video_url')) {
                // Delete old video
                if ($Episode->video_url) {
                    Storage::disk('public')->delete($Episode->video_url);
                }

                // Store new video
                $file = $request->file('video_url');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('AnimeCardvideo', $filename, 'public');
                $input['video_url'] = $path;
            } else {
                unset($input['video_url']);
            }

            $Episode->update($input);

            return response()->json([
                'message' => 'AnimeAnimeCard updated successfully.',
                'data' => $Episode
            ], 200);
        }
        public function  showWithEpisodes($animeCardId)
        {
            try {
                // Retrieve the AnimeCard by ID
                $animeCard = AnimeCard::findOrFail($animeCardId);

                // Retrieve the episodes associated with the AnimeCard
                $episodes = Episode::where('anime_card_id', $animeCardId)->get();

                // Return both AnimeCard and its Episodes as a JSON response
                return response()->json([
                    'anime_card' => $animeCard,
                    'episodes' => $episodes,
                ], 200);

            } catch (\Exception $e) {
                // In case of an error (e.g., AnimeCard not found)
                return response()->json([
                    'error' => 'Anime card not found or no episodes available',
                ], 404);
            }
        }
    }
