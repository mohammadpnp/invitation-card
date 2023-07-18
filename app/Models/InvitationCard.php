<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvitationCard extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'url',
        'card_type',
        'card_id',
        'status'
    ];

    public function user(){
        return $this->belongsTo(CompanyMember::class);
    }

    public function surveys(){
        return $this->hasMany(Survey::class , 'card_id');
    }

    public function card()
    {
        return $this->morphTo();
    }

    public $cards = [
        WeddingCard::class,
    ];


    public const CREATED_STATUS = 1;
    public const WAITING_CONFIRM_STATUS = 2;
    public const CONFIRMED_STATUS = 3;
    public const WAITING_EDIT_CONFIRM_STATUS = 4;
}
