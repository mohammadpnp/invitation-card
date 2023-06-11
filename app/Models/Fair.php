<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Fair extends Model
{
    use HasFactory;

    public function company(): BelongsToMany
    {
        return $this->belongsToMany(CompanyMember::class, 'company_fair' , 'fair_id' , 'company_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_fair' , 'fair_id' , 'user_id');
    }

    public function cards()
    {
        return $this->hasMany(WeddingCard::class , 'fair_id');
    }

    public function scopeFilter($query, $request)
    {
        if ($request->get('archive')) {
            $query->where('end_date', '<', date('Y-m-d'));
        }
    }


    public function getPosterUrlAttribute()
    {
        return Storage::disk('fair_places_pictures')->url($this->poster ?? config('app.settings.storage.default_image'));
    }
}
