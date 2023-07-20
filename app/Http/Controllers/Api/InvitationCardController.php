<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InvitationCard\SubmitSurveyRequest;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardResource;
use App\Http\Resources\InvitationCardsResource;
use App\Http\Resources\PoemResource;
use App\Http\Resources\PoemsResource;
use App\Models\Activity;
use App\Models\Fair;
use App\Models\Poem;
use App\Models\Survey;
use App\Models\WeddingCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Morilog\Jalali\Jalalian;

class InvitationCardController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::find($fairId);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        $invitationCards = $fair->cards()
            ->filter($request)
            ->orderBy('weight', 'desc')
            ->get();

        $tags = Activity::where('type' , Activity::TYPE_AREA)->get();

        return $this->done([
            'fair' => new FairsResource($fair),
            'invitation_cards' => InvitationCardsResource::collection($invitationCards)->response()->getData(true),
            'filters' => [
                'tags' => ActivityResource::collection($tags)->response()->getData(true)
            ]
        ]);
    }

    public function show($id)
    {
        $invitationCard = WeddingCard::with(['pictures','fair.fairPlace','poem'])->find($id);
        if(!$invitationCard) {
            return $this->failed('کارت دعوت یافت نشد');
        }

        $poem = $invitationCard->poem ?? Poem::inRandomOrder()->first();

        return $this->done([
            'invitation_card' => new InvitationCardResource($invitationCard),
            'poem' => new PoemResource($poem)
        ]);
    }

    public function survey($id , SubmitSurveyRequest $request)
    {
        $data = $request->validated();

        $invitationCard = WeddingCard::find($id);
        if(!$invitationCard) {
            return $this->failed('کارت دعوت یافت نشد');
        }

        if ($data['come_datetime'])
            $come = Jalalian::fromFormat('Y-m-d H:i', $data['come_datetime'])->toCarbon()->toDateTimeString();

        Survey::create([
            'card_id' => $invitationCard->id,
            'is_participate' => $data['is_participate'],
            'come_datetime' => $come ?? null,
            'note' => $data['note'] ?? null
        ]);

        return $this->done();
    }
}
