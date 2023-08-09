<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\CardsFilterResource;
use App\Http\Resources\DeputizeResource;
use App\Http\Resources\DeputizesResource;
use App\Http\Resources\FairsResource;
use App\Http\Resources\NavbarResource;
use App\Models\Activity;
use App\Models\Deputize;
use App\Models\Fair;
use App\Models\InvitationCard;
use App\Models\Navbar;
use Illuminate\Http\Request;

class DeputizeController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::with('fairPlace')->find($fairId);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        $deputizes = $fair->deputizes()
            ->filter($request)
            ->orderBy('weight', 'desc')
            ->get();

        $tags = Activity::where('type' , Activity::TYPE_AREA)->get();

        $menus = Navbar::all();

        return $this->done([
            'fair' => new FairsResource($fair),
            'deputizes' => DeputizesResource::collection($deputizes)->response()->getData(true),
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
//                'type' => CardsFilterResource::collection(InvitationCard::getCards())->response()->getData(true),
            ]
        ]);
    }

    public function show($id)
    {
        $deputize = Deputize::with(['pictures','products'])->find($id);
        if(!$deputize) {
            return $this->failed('آگهی اعطای نمایندگی یافت نشد');
        }

        return $this->done([
            'deputize' => new DeputizeResource($deputize),
        ]);
    }
}
