<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Tymon\JWTAuth\Facades\JWTAuth;

class StripePaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $amount = $request->amount;

            // Create a PaymentIntent
            $paymentIntent = PaymentIntent::create([
                'amount' => (float)$amount * 100, // Convert to cents
                'currency' => 'usd',
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function completeOrder(Request $request)
    {
        try {
            // Validate request data
            $data = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'phone' => 'required|string',
            ]);

            // Get authenticated user
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $user->id;

            // Get cart items
            $cartItems = Cart::where('user_id', $userId)->get();

            // Create orders for each cart item
            foreach ($cartItems as $cartItem) {
                Order::create([
                    'name' => $data['name'],
                    'rec_address' => $data['address'],
                    'phone' => $data['phone'],
                    'user_id' => $userId,
                    'product_id' => $cartItem->product_id,
                    'payment_status' => 'paid',
                ]);
            }

            // Clear the cart
            Cart::where('user_id', $userId)->delete();

            return response()->json([
                'message' => 'Order placed successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
