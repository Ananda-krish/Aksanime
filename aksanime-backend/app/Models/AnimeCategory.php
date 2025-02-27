<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnimeCategory extends Model
{
    protected $fillable = ['name'];

    // Define the inverse relationship with AnimeCard
    public function animeCards()
    {
        return $this->hasMany(AnimeCard::class, 'anime_category_id');
    }
}
