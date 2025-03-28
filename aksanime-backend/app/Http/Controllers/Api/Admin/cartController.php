<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{ public function addToCart($id)
    {
        try {
            // Authenticate the user
            $user = JWTAuth::parseToken()->authenticate();
            $user_id = $user->id;

            // Validate input
            $data = request()->validate([
                'quantity' => 'required|integer|min:1', // Ensure quantity is valid
            ]);

            // Fetch the product details
            $product = Product::findOrFail($id); // Throws 404 if product not found
            $price = $product->price;

            // Check if the requested quantity exceeds available stock
            if ($product->stock < $data['quantity']) {
                return response()->json(['error' => 'Requested quantity exceeds available stock'], 400);
            }

            // Check if the product is already in the cart
            $existingCartItem = Cart::where('user_id', $user_id)
                                    ->where('product_id', $id)
                                    ->where('status', 'pending') // Only check pending items
                                    ->first();

            if ($existingCartItem) {
                // Update the existing cart item's quantity
                $newQuantity = $existingCartItem->quantity + $data['quantity'];
                if ($product->stock < $newQuantity) {
                    return response()->json(['error' => 'Updated quantity exceeds available stock'], 400);
                }
                $existingCartItem->update(['quantity' => $newQuantity]);
            } else {
                // Create a new cart entry
                Cart::create([
                    'user_id' => $user_id,
                    'product_id' => $id,
                    'quantity' => $data['quantity'],
                    'price' => $price,
                    'status' => 'pending',
                    'added_at' => now(),
                ]);
            }

            // Decrement the product's stock
            $product->decrement('stock', $data['quantity']);

            // Return success response
            return response()->json(['message' => 'Product added to cart successfully'], 200);
        } catch (\Exception $e) {
            // Log the error and return a generic error message
            Log::error('Cart addition failed: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }    public function getCart()
    {
        try {
            // Authenticate the user
            $user = JWTAuth::parseToken()->authenticate();
            Log::info('Fetching cart for user:', ['user_id' => $user->id]);

            // Fetch cart items with product details
            $cartItems = Cart::with(['product' => function ($query) {
                $query->select('id', 'title', 'price', 'image_url'); // Only fetch necessary fields
            }])
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->get();

            // Filter out cart items without a valid product
            $cartItems = $cartItems->filter(function ($cartItem) {
                return $cartItem->product !== null; // Exclude cart items with missing products
            });

            Log::info('Filtered cart items:', ['filtered_cart_items' => $cartItems]);

            // Calculate the total price
            $total = $cartItems->sum(function ($item) {
                return $item->price * $item->quantity;
            });

            Log::info('Calculated total:', ['total' => $total]);

            // Return the response
            return response()->json([
                'cart_items' => $cartItems,
                'total' => $total
            ], 200);
        } catch (\Exception $e) {
            Log::error('Cart fetch failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch cart items'], 500);
        }
    }


    public function updateCartItem(Request $request, $cartItemId)
    {
        try {
            // Authenticate the user
            $user = JWTAuth::parseToken()->authenticate();

            // Validate the request data
            $data = $request->validate([
                'quantity' => 'required|integer|min:1', // Ensure quantity is valid
            ]);

            // Find the cart item for the authenticated user
            $cartItem = Cart::where('user_id', $user->id)
                            ->where('id', $cartItemId)
                            ->with('product') // Eager load the product relationship
                            ->firstOrFail();

            // Check if the requested quantity exceeds available stock
            if ($cartItem->product->stock < $data['quantity']) {
                return response()->json([
                    'error' => 'Requested quantity exceeds available stock',
                ], 400);
            }

            // Update the cart item's quantity
            $cartItem->update([
                'quantity' => $data['quantity'],
            ]);

            // Recalculate the total price of the cart
            $newTotal = Cart::where('user_id', $user->id)
                            ->where('status', 'pending')
                            ->sum(DB::raw('price * quantity'));

            // Return the success response
            return response()->json([
                'message' => 'Cart updated successfully',
                'cart_item' => $cartItem,
                'cart_total' => $newTotal,
            ], 200);
        } catch (\Exception $e) {
            // Log the error and return a generic error message
            Log::error('Cart update failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update cart item'], 500);
        }
    }


    public function removeCartItem($cartItemId)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $cartItem = Cart::where('user_id', $user->id)
                          ->where('id', $cartItemId)
                          ->firstOrFail();

            $cartItem->delete();

            // Recalculate cart total
            $newTotal = Cart::where('user_id', $user->id)
                          ->where('status', 'pending')
                          ->sum(DB::raw('price * quantity'));

            return response()->json([
                'message' => 'Item removed from cart',
                'cart_total' => $newTotal
            ], 200);
        } catch (\Exception $e) {
            Log::error('Cart item removal failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to remove cart item'], 500);
        }
    }

    public function clearCart()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            Cart::where('user_id', $user->id)
                ->where('status', 'pending')
                ->delete();

            return response()->json(['message' => 'Cart cleared successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Cart clear failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to clear cart'], 500);
        }
    }

    public function getCartCount()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $count = Cart::where('user_id', $user->id)
                        ->where('status', 'pending')
                        ->count();

            return response()->json(['count' => $count], 200);
        } catch (\Exception $e) {
            Log::error('Cart count fetch failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to get cart count'], 500);
        }
    }
    public function confirm_order(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userid = $user->id;

            // Validate request data
            $data = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'phone' => 'required|string',
            ]);

            $cart = Cart::where('user_id', $userid)->get();

            foreach ($cart as $carts) {
                $order = new Order();
                $order->name = $data['name'];
                $order->rec_address = $data['address'];
                $order->phone = $data['phone'];
                $order->user_id = $userid;
                $order->product_id = $carts->product_id;
                $order->save();
            }

            // Clear the cart
            Cart::where('user_id', $userid)->delete();

            return response()->json(['message' => 'Order placed successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to place order: ' . $e->getMessage()], 500);
        }
    }

    public function view_order()
    {
        try {
            $orders = Order::with(['user', 'product'])->get(); // Eager load relationships
            return response()->json($orders);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch orders: ' . $e->getMessage()], 500);
        }
    }
    public function on_the_way($id){
        $data= Order::find($id);
        $data->status ='on the way';
        $data->save();
        return response()->json(['message' => 'status changed successfully'], 200);
    }
    public function delivered($id){
        $data= Order::find($id);
        $data->status ='Delivered';
        $data->save();
        return response()->json(['message' => 'status changed successfully'], 200);
    }
    public function print_pdf($id)
    {
        // Fetch the order by ID
        $order = Order::find($id);

        // Check if the order exists
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Load the view with the order data
        $pdf = Pdf::loadView('pdf.order', ['order' => $order]);

        // Convert the PDF to base64
        $pdfContent = base64_encode($pdf->output());

        // Return the base64-encoded PDF as a JSON response
        return response()->json([
            'pdf' => $pdfContent,
            'filename' => 'order_' . $order->id . '.pdf'
        ]);
    }
    public function myorders(){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userid = $user->id;

            // Debug: Add logging or error checking
            Log::info('User ID: ' . $userid);

            $orders = Order::where('user_id', $userid)
                ->with('product') // Eager load related product
                ->get();

            return response()->json([
                'count' => $orders->count(),
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            // Log the full error for debugging
            Log::error('Order Retrieval Error: ' . $e->getMessage());
            Log::error('Trace: ' . $e->getTraceAsString());

            return response()->json([
                'error' => 'Unable to retrieve orders',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}