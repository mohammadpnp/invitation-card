<?php

namespace App\Models;

use App\Traits\HasMainPicture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SpecialSell extends Model
{
    use HasFactory , HasMainPicture;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_special_sell');
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('special_sell_pictures')->url($this->logo) : null;
    }
}
