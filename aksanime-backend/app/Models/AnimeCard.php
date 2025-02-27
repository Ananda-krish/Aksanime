<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimeCard extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'short_id',
        'description',
        'image_url',
        'rating',
        'status',
        'seasons',
        'latest_episode',
        'anime_category_id',
    ];

    // Relationship to episodes
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
    public function category()
    {
        return $this->belongsTo(AnimeCategory::class, 'anime_category_id');
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

