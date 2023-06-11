<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardsResource;
use App\Models\Fair;
use Illuminate\Http\Request;

class InvitationCardController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::find($fairId);

        $invitationCards = $fair->cards()
            ->orderBy('weight', 'desc')
            ->get();

        if (!$invitationCards) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        return [
            'fair' => new FairsResource($fair),
            'invitationCards' => InvitationCardsResource::collection($invitationCards)->response()->getData(true)
        ];
    }
}
