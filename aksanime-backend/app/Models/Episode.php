<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'anime_card_id',
        'title',
        'description',
        'episode_number',
        'video_url', // Add the video_url field
    ];
    // Relationship to anime card
    public function animeCard()
    {
        return $this->belongsTo(AnimeCard::class, 'anime_card_id');
    }
}
