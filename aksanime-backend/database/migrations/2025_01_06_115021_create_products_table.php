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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('image_url');
            $table->foreignId('product_category_id')->constrained()->onDelete('cascade');
            $table->foreignId('anime_card_id')->constrained('anime_cards')->onDelete('cascade');
            $table->decimal('product_rating', 3, 2);
            $table->integer('stock')->default(0);
            $table->text('warranty_details');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
