<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_id',
        'is_participate',
        'user_id',
        'note',
        'come_datetime'
    ];

    public function card()
    {
        return $this->belongsTo(InvitationCard::class, 'card_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
