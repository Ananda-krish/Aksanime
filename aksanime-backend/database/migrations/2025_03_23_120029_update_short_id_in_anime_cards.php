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
        Schema::table('anime_cards', function (Blueprint $table) {
            // Drop the unique constraint
            $table->dropUnique(['short_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('anime_cards', function (Blueprint $table) {
            // Re-add the unique constraint if needed
            $table->unique('short_id');
        });
    }
};
