<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
      'link',
      'card_type',
      'card_id'
    ];

    public function weddingCard()
    {
        return $this->morphedByMany(WeddingCard::class, 'card','card_attachments');
    }
}
