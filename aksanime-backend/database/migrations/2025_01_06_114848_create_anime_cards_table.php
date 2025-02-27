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
        Schema::create('anime_cards', function (Blueprint $table) {
            $table->id(); // auto-incrementing ID column
            $table->string('title');
            $table->string('short_id')->unique();
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->decimal('rating', 3, 2);
            $table->enum('status', ['ongoing', 'completed', 'upcoming']);
            $table->integer('seasons');
            $table->integer('latest_episode');

            // Ensure the foreign key is unsigned
            $table->unsignedBigInteger('anime_category_id');

            // Add the foreign key constraint
            $table->foreign('anime_category_id')->references('id')->on('anime_categories')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_cards');
    }
};
