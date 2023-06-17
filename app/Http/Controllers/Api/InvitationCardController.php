<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardResource;
use App\Http\Resources\InvitationCardsResource;
use App\Http\Resources\PoemResource;
use App\Http\Resources\PoemsResource;
use App\Models\Fair;
use App\Models\Poem;
use App\Models\WeddingCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvitationCardController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::find($fairId);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        $invitationCards = $fair->cards()
            ->orderBy('weight', 'desc')
            ->get();

        return [
            'fair' => new FairsResource($fair),
            'invitationCards' => InvitationCardsResource::collection($invitationCards)->response()->getData(true)
        ];
    }

    public function show($id)
    {
        $invitationCard = WeddingCard::with(['pictures','fair.fairPlace','poem'])->find($id);
        if(!$invitationCard) {
            return $this->failed('کارت دعوت یافت نشد');
        }

        $poem = $invitationCard->poem ?? Poem::inRandomOrder()->first();

        return $this->done([
            'InvitationCard' => new InvitationCardResource($invitationCard),
            'poem' => new PoemResource($poem)
        ]);
    }
}
