<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StripePaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $amount = $request->amount;
            $paymentIntent = PaymentIntent::create([
                'amount' => (float)$amount * 100,
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
        DB::beginTransaction();

        try {
            // Validate request data
            $validated = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'phone' => 'required|string',
            ]);

            // Get authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            // Get cart items with product details
            $cartItems = Cart::with('product')
                ->where('user_id', $user->id)
                ->get();

            if ($cartItems->isEmpty()) {
                throw new \Exception('No items in cart');
            }

            // Log cart items for debugging
            Log::info('Creating orders for cart items:', $cartItems->toArray());

            // Create orders for each cart item
            foreach ($cartItems as $cartItem) {
                $order = Order::create([
                    'name' => $validated['name'],
                    'rec_address' => $validated['address'],
                    'phone' => $validated['phone'],
                    'user_id' => $user->id,
                    'product_id' => $cartItem->product_id,
                    'status' => 'in progress',
                    'payment_status' => 'paid', // Make sure this matches your migration
                ]);

                Log::info('Created order:', $order->toArray());
            }

            // Clear the cart
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order_count' => $cartItems->count()
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}