<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\FairsResource;
use App\Http\Resources\NavbarResource;
use App\Http\Resources\PaperCardResource;
use App\Http\Resources\PaperCardsResource;
use App\Http\Resources\PoemResource;
use App\Models\Activity;
use App\Models\Fair;
use App\Models\Navbar;
use App\Models\PaperCard;
use App\Models\Poem;
use Illuminate\Http\Request;

class PaperCardController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::with('fairPlace')->find($fairId);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        $paperCards = $fair->paperCards()
            ->filter($request)
            ->orderBy('weight', 'desc')
            ->get();

        $tags = Activity::where('type' , Activity::TYPE_AREA)->get();

        $menus = Navbar::all();

        return $this->done([
            'fair' => new FairsResource($fair),
            'paper_cards' => PaperCardsResource::collection($paperCards)->response()->getData(true),
            'banners' =>[
                'position' => 'top',
                'items' => BannerResorce::collection([$fair->fairPlace])->response()->getData(true)
            ],
            'menus' =>[
                'position' => 'navigation',
                'items' => NavbarResource::collection($menus)->response()->getData(true)
            ],
            'filters' => [
                'tags' => ActivityResource::collection($tags)->response()->getData(true),
                //'type' => CardsFilterResource::collection(InvitationCard::getCards())->response()->getData(true),
            ]
        ]);
    }

    public function show($id)
    {
        $paperCard = PaperCard::with(['pictures','fair.fairPlace','poem'])->find($id);
        if(!$paperCard) {
            return $this->failed('لوح تقدیر یافت نشد');
        }

        $poem = $paperCard->poem ?? Poem::inRandomOrder()->first();

        return $this->done([
            'paper_card' => new PaperCardResource($paperCard),
            'poem' => new PoemResource($poem)
        ]);
    }
}
