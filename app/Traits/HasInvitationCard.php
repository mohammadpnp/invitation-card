<?php

namespace App\Traits;

use App\Models\InvitationCard;

trait HasInvitationCard{
    public function card(){
        return $this->belongsTo(InvitationCard::class,'card_id');
    }
}
