<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WeddingCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_id',
        'title',
        'started_at',
        'finished_at',
        'description',
        'address',
        'lat',
        'lng',
        'logo',
        'slogan',
        'brand',
        'instagram_link',
        'website_link',
        'youtube_link',
        'poster',
        'description_header',
        'description_footer',
        'manager_photo',
        'province',
        'city',
        'saloon',
        'booth',
        'fair_id',
        'have_poem',
    ];

    public function card(){
        return $this->belongsTo(InvitationCard::class,'card_id');
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('wedding_card_picturs')->url($this->logo) : null;
    }

    public function getManagerPhotoUrlAttribute()
    {
        return $this->manager_photo ? Storage::disk('wedding_card_picturs')->url($this->manager_photo) : null;
    }

    public function getPosterUrlAttribute()
    {
        return $this->poster ? Storage::disk('wedding_card_picturs')->url($this->poster) : null;
    }

    public function pictures()
    {
        return $this->morphMany(CardAttachment::class, 'card','card_type');
    }

    public function fair()
    {
        return $this->belongsTo(FairPlace::class , 'fair_id');
    }

}
