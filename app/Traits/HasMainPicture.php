<?php

namespace App\Traits;


use App\Models\CardAttachment;

trait HasMainPicture {
    public function pictures()
    {
        return $this->morphMany(CardAttachment::class, 'card','card_type');
    }
}
