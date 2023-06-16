<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CardAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
      'link',
      'card_type',
      'card_id'
    ];

    public function getLinkUrlAttribute()
    {
        return $this->link ? Storage::disk('card_attachment')->url($this->link) : null;
    }

    public function weddingCard()
    {
        return $this->morphedByMany(WeddingCard::class, 'card','card_attachments');
    }
}
