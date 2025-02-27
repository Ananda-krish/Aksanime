<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key to users
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Foreign key to products
            $table->integer('quantity')->default(1); // Quantity of the product
            $table->double('price', 15, 2); // Price with two decimal points
            $table->decimal('discount', 5, 2)->default(0); // Discount amount
            $table->decimal('tax', 5, 2)->default(0); // Tax amount
            $table->string('product_options')->nullable(); // Extra options for the product (e.g., size, color)
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending'); // Cart item status
            $table->timestamp('added_at')->nullable(); // Date when the product was added to the cart
            $table->string('coupon_code')->nullable(); // Coupon code used
            $table->decimal('coupon_discount', 5, 2)->default(0); // Coupon discount applied
            $table->integer('stock_reserved')->default(0); // Reserved stock for the cart item
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
