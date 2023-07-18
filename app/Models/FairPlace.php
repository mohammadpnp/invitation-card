<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class FairPlace extends Model
{
    use HasFactory;

    public function scopeFilter($query, $request)
    {
        if (isset($request->get('filter')['is_internal'])) {
            $query->where('is_internal', true);
        }else{
            $query->where('is_internal', false);
        }
    }

    public function getPosterUrlAttribute()
    {
        return Storage::disk('fairs_pictures')->url($this->poster ?? config('app.settings.storage.default_image'));
    }

    public function fairs()
    {
        return $this->hasMany(Fair::class, 'fair_place_id');
    }
}
