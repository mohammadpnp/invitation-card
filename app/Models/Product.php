<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    public function getPictureUrlAttribute()
    {
        return Storage::disk('product_pictures')->url($this->picture ?? null);
    }
}