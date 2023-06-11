<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaperCard extends Model
{
    use HasFactory;

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
}
