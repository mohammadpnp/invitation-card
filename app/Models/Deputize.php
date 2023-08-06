<?php

namespace App\Models;

use App\Traits\HasInvitationCard;
use App\Traits\HasMainPicture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Deputize extends Model
{
    use HasFactory , HasMainPicture , HasInvitationCard;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_deputize');
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('deputize_pictures')->url($this->logo) : null;
    }

    public function scopeFilter($query, $request)
    {
//        if (isset($request->get('filter')['tags'])) {
//            $tagIds = $request->get('filter')['tags'];
//            $query->whereHas('activities',  function($query) use($tagIds){
//                $query->whereIn('id' , $tagIds);
//            });
//        }
    }
}
