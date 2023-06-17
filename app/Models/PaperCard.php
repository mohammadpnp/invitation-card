<?php

namespace App\Models;

use App\Traits\HasMainPicture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PaperCard extends Model
{
    use HasFactory , HasMainPicture;

    protected $fillable = [
        'card_id',
        'title',
        'started_at',
        'finished_at',
        'address',
        'gender',
        'first_name',
        'last_name',
        'text'
    ];

    public const MAN_GENDER = 1;
    public const WOMAN_GENDER = 0;

    public function card(){
        return $this->belongsTo(InvitationCard::class,'card_id');
    }

    public function poem()
    {
        return $this->belongsTo(Poem::class , 'poem_id');
    }

    public function fair()
    {
        return $this->belongsTo(Fair::class , 'fair_id');
    }

    public function getManagerPhotoUrlAttribute()
    {
        return $this->manager_photo ? Storage::disk('paper_card_pictures')->url($this->manager_photo) : null;
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('paper_card_pictures')->url($this->logo) : null;
    }

}
