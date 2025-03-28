<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserSaveRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdminUserController extends Controller
{
    public function index()
    {
        try {
            $users = User::select('id', 'name', 'email', 'phone_number', 'about', 'image', 'created_at')
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($user) {
                            // Transform the image path to full URL
                            $user->image = $user->image ? asset('storage/' . $user->image) : null;
                            return $user;
                        });

            return response()->json([
                'success' => true,
                'users' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            // Delete user's image if exists
            if ($user->image && Storage::exists('public/' . $user->image)) {
                Storage::delete('public/' . $user->image);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user'
            ], 500);
        }
    }
    public function update(UserSaveRequest $request, $id)
    {
        try {
            // Find the user
            $user = User::findOrFail($id);

            // Validate the request
            $validated = $request->validated();

            // Handle image upload if present
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($user->image && Storage::exists('public/' . $user->image)) {
                    Storage::delete('public/' . $user->image);
                }

                $imagePath = $request->file('image')->store('user-images', 'public');
                $validated['image'] = $imagePath;
            }

            // Password handling
            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
                $validated['confirm_password'] = $validated['password'];
            } else {
                // If password is not being updated, remove these keys
                unset($validated['password']);
                unset($validated['confirm_password']);
            }

            // Remove any null or empty values
            $validated = array_filter($validated, function ($value) {
                return $value !== null && $value !== '';
            });

            // Update the user
            $user->update($validated);

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user->makeHidden(['password', 'confirm_password']),
            ], 200);

        } catch (\Exception $e) {
            // Log the full error for debugging
            Log::error('User update error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'message' => 'Failed to update user',
                'error' => 'An unexpected error occurred'
            ], 500);
        }
    }
public function show($id)
{
    try {
        $user = User::select('id', 'name', 'email', 'phone_number', 'about', 'image', 'created_at')
                    ->findOrFail($id);

        // Transform the image path to full URL
        $user->image = $user->image ? asset('storage/' . $user->image) : null;

        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'User not found'
        ], 404);
    }
}
}