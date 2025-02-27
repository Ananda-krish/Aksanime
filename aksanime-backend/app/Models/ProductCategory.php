<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $fillable = ['name'];

    // Define the inverse relationship with AnimeCard
    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
