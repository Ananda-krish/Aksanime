<?php

namespace App\Http\Controllers\Api\Admin;
use Illuminate\Auth\Events\Registered;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserSaveRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class LoginController extends Controller
{
    /**
     * Register a new user.
     *
     * @param UserSaveRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserSaveRequest $request)
    {
        // Validate the request data
        $validated = $request->validated();

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('user-images', 'public');
            $validated['image'] = $imagePath;
        }

        // Hash the password
        $validated['password'] = Hash::make($validated['password']);
        $validated['confirm_password'] = $validated['password'];

        // Create the user
        $user = User::create($validated);
       
        // Generate JWT token for the newly registered user
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user->makeHidden(['password', 'confirm_password']),
            'token' => $token,
        ], 201);
    }
    /**
     * Authenticate a user and generate a JWT token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid credentials',
            ], 401);
        }

        // Generate JWT token for the authenticated user
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user->makeHidden(['password', 'confirm_password', 'created_at', 'updated_at']),
        ]);
    }

    /**
     * Get the authenticated user's dashboard data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function dashboard()
    {
        try {
            // Authenticate the user using the token
            $user = JWTAuth::parseToken()->authenticate();

            return response()->json([
                'user' => $user->makeHidden(['password', 'confirm_password']),
                'message' => 'Welcome to your dashboard',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }
    }

    /**
     * Log out the authenticated user and invalidate the token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            // Invalidate the current token
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => 'Logged out successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to logout',
            ], 500);
        }
    }
    public function refreshToken(Request $request)
    {
        try {
            // Validate the refresh token
            $refreshToken = $request->input('refresh_token');
            if (!$refreshToken) {
                return response()->json(['error' => 'Refresh token is required'], 400);
            }

            // Attempt to refresh the token
            $newToken = JWTAuth::setToken($refreshToken)->refresh();

            return response()->json(['access_token' => $newToken], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to refresh token'], 401);
        }
    }

    public function index()


        {
            try {
                // Fetch total users count - removed the incorrect orderBy('month')
                $userGrowthData = User::where('role', 'user')->count();

                // Fetch product category distribution
                $productCategoryData = Product::all()
                    ->groupBy('category')
                    ->count();

                // Fetch order statistics
                $totalOrders = Order::count();
                $deliveredOrders = Order::where('status', 'Delivered')->count();
                $pendingOrders = Order::where('status', 'inprogress')->count();

                // Format the response
                return response()->json([
                    'stats' => [
                        'totalUsers' => $userGrowthData,
                        'totalProducts' => $productCategoryData,
                        'totalOrders' => $totalOrders,
                        'deliveredOrders' => $deliveredOrders,
                        'pendingOrders' => $pendingOrders
                    ]
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to fetch dashboard data',
                    'message' => $e->getMessage()
                ], 500);
            }
        }
        public function emailVerify(EmailVerificationRequest $request)
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();

                if (!$user) {
                    return response()->json([
                        'error' => 'User not found',
                    ], 404);
                }

                if ($user->hasVerifiedEmail()) {
                    return response()->json([
                        'message' => 'Email already verified',
                    ], 400);
                }

                // Mark the user's email as verified
                $request->fulfill();

                return response()->json([
                    'message' => 'Email verified successfully',
                ], 200);
            } catch (JWTException $e) {
                return response()->json([
                    'error' => 'Invalid token',
                ], 401);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Email verification failed',
                    'message' => $e->getMessage(),
                ], 500);
            }
        }
        public function resend(Request $request)
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();

                if (!$user) {
                    return response()->json([
                        'error' => 'User not found'
                    ], 404);
                }

                if ($user->hasVerifiedEmail()) {
                    return response()->json([
                        'message' => 'Email already verified'
                    ], 400);
                }

                $user->sendEmailVerificationNotification();

                return response()->json([
                    'message' => 'Verification link sent successfully'
                ], 200);
            } catch (JWTException $e) {
                return response()->json([
                    'error' => 'Invalid token'
                ], 401);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to send verification email',
                    'message' => $e->getMessage()
                ], 500);
            }
        }
    }
