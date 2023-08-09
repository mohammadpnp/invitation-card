<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\CardsFilterResource;
use App\Http\Resources\FairPlacesResource;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardResource;
use App\Http\Resources\InvitationCardsResource;
use App\Http\Resources\NavbarResource;
use App\Models\Activity;
use App\Models\Fair;
use App\Models\FairPlace;
use App\Models\InvitationCard;
use App\Models\Navbar;
use Illuminate\Http\Request;

class FairsController extends Controller
{
    public function index(Request $request)
    {
        $fairs = Fair::filter($request)
            ->with('fairPlace')
            ->orderByDesc('id')
            ->paginate($request->get('per_page',10));

        $fair_places = FairPlace::all();

        $menus = Navbar::all();

        return $this->done([
            'fairs' => FairsResource::collection($fairs)->response()->getData(true),
            'fair_places' => FairPlacesResource::collection($fair_places)->response()->getData(true),
            'banners' =>[
                'position' => 'top',
                'items' => BannerResorce::collection($fair_places->where('slider',true))->response()->getData(true)
            ],
            'menus' =>[
                'position' => 'navigation',
                'items' => NavbarResource::collection($menus)->response()->getData(true)
            ],
            'filters' => [
                'archive' => [
                    'data' =>[
                    [
                        'id' => 1,
                        'name' => 'نمایشگاه های در حال برگزاری و آتی',
                        'archive' => in_array(1,$request->get('filter')['archive'] ?? [])
                    ],
                    [
                        'id' => 0,
                        'name' => 'آرشیو نمایشگاه ها',
                        'archive' => in_array(0,$request->get('filter')['archive'] ?? [])
                    ],
                        ]
                ]
            ]
        ]);
    }

    public function fairPlaces(Request $request)
    {
        $fairs = FairPlace::filter($request)
            ->orderByDesc('id')
            ->paginate($request->get('per_page',10));

        $menus = Navbar::all();

        return $this->done([
            'fair_places' => FairPlacesResource::collection($fairs)->response()->getData(true),
            'banners' =>[
                'position' => 'top',
                'items' => BannerResorce::collection($fairs->where('slider',true))->response()->getData(true)
            ],
            'menus' =>[
                'position' => 'navigation',
                'items' => NavbarResource::collection($menus)->response()->getData(true)
            ],
            'filters' => [
                'is_internal' => [
                    'data' =>[
                    [
                        'id' => 1,
                        'name' => 'مراکز نمایشگاه داخلی',
                        'is_active' => in_array(1,$request->get('filter')['is_internal'] ?? [])
                    ],
                    [
                        'id' => 0,
                        'name' => 'مراکز نمایشگاه خارجی',
                        'is_active' => in_array(0,$request->get('filter')['is_internal'] ?? [])
                    ],
                        ]
                ]
            ]
        ]);
    }

    public function fairCardList($id , Request $request)
    {
        $fair = Fair::with(['cards','paperCards','deputizes','specialSells'])->find($id);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }
        $invitationCards = InvitationCard::filter($request)
            ->whereRelation('card','fair_id',$id)
            ->with('card')
            ->get();

        $cards =[];
        foreach ($invitationCards as $invitationCard){
           $cards[] = $invitationCard->card;
        }

        $menus = Navbar::all();
        $tags = Activity::where('type' , Activity::TYPE_AREA)->get();

        return $this->done([
            'fair' => new FairsResource($fair),
            'cards' => InvitationCardsResource::collection($cards)->response()->getData(true),
            'menus' =>[
                'position' => 'navigation',
                'items' => NavbarResource::collection($menus)->response()->getData(true)
            ],
            'banners' =>[
                'position' => 'top',
                'items' => BannerResorce::collection([$fair])->response()->getData(true)
            ],
            'filters' => [
                'type' => CardsFilterResource::collection(InvitationCard::getCards())->response()->getData(true),
                'tags' => ActivityResource::collection($tags)->response()->getData(true),
            ]
        ]);
    }
}
