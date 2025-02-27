<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'title',
        'description',
        'price',
        'image_url',
        'product_category_id',
        'anime_card_id',
        'product_rating',
        'warranty_details',
        'stock',
    ];

    /**
     * Get the category that owns the product.
     */
    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    /**
     * Get the anime card associated with the product.
     */
    public function animeCard()
    {
        return $this->belongsTo(AnimeCard::class);
    }
}
