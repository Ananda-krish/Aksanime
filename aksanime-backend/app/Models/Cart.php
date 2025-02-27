<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'price',
        'discount',
        'tax',
        'product_options',
        'status',
        'added_at',
        'coupon_code',
        'coupon_discount',
        'stock_reserved',
    ];

    // Casts for proper data types
    protected $casts = [
        'product_options' => 'array',
        'price' => 'float',
        'discount' => 'float',
        'tax' => 'float',
        'coupon_discount' => 'float',
        'added_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Calculate total price for the cart item
    public function getTotalPrice()
    {
        $basePrice = ($this->price * $this->quantity);
        $discountAmount = ($this->discount + $this->coupon_discount) * $this->quantity;
        $taxAmount = $this->tax * $this->quantity;
        return $basePrice - $discountAmount + $taxAmount;
    }

    // Reserve stock for the cart item
    public function reserveStock()
    {
        $this->update(['stock_reserved' => $this->quantity]);
        $this->product()->decrement('stock', $this->quantity);
    }

    // Release reserved stock when the cart item is removed
    public function releaseStock()
    {
        $this->product()->increment('stock', $this->stock_reserved);
        $this->update(['stock_reserved' => 0]);
    }
}
