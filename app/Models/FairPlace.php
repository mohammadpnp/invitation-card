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
        if ($request->get('is_internal')) {
            $query->where('is_internal', $request->is_internal);
        }
    }

    public function getPosterUrlAttribute()
    {
        return Storage::disk('fairs_pictures')->url($this->poster ?? config('app.settings.storage.default_image'));
    }
}
