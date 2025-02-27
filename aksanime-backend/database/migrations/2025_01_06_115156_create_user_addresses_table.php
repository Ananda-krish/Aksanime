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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id(); // auto-incrementing ID
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key
            $table->string('flat_no')->nullable(); // Flat number
            $table->string('area')->nullable(); // Area
            $table->string('location')->nullable(); // Location
            $table->string('city')->nullable(); // City
            $table->string('district')->nullable(); // District
            $table->string('pincode')->nullable(); // Pincode
            $table->string('state')->nullable(); // State
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
