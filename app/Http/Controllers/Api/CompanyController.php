<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\CardsFilterResource;
use App\Http\Resources\CompanyCardListResource;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\DeputizeResource;
use App\Http\Resources\FairFilterResource;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardResource;
use App\Http\Resources\InvitationCardsResource;
use App\Http\Resources\NavbarResource;
use App\Http\Resources\PaperCardResource;
use App\Http\Resources\SpecialSellResource;
use App\Models\CompanyMember;
use App\Models\Deputize;
use App\Models\Fair;
use App\Models\InvitationCard;
use App\Models\Navbar;
use App\Models\PaperCard;
use App\Models\SpecialSell;
use App\Models\WeddingCard;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function companyCardsList($id , Request $request)
    {
        $company = CompanyMember::with('cards.card')->find($id);
        if (!$company) {
            return $this->failed('شرکت یافت نشد');
        }
        $companyCards = $company->cards;

//        filtering data by type
        if (isset($request->get('filter')['type'])) {
            $types = [];
            foreach ($request->get('filter')['type'] as $type){
               array_push($types , InvitationCard::getCards()[$type]);
            }
            $companyCards = $companyCards->whereIn('card_type', $types);
        }

        $cards =[];
        foreach ($companyCards as $invitationCard){
//            filtering by fairs
            if (isset($request->get('filter')['fairs'])){
                if (in_array($invitationCard->card->fair_id,$request->get('filter')['fairs'])){
                    $cards[] = new InvitationCardResource($invitationCard->card);
                }
            }else{
                $cards[] = new InvitationCardResource($invitationCard->card);
            }
        }

        $fairs = Fair::all(['id','name']);
        $menus = Navbar::all();

        return $this->done([
            'company' => new CompanyResource($company),
            'cards' => InvitationCardsResource::collection($cards)->response()->getData(true),
            'menus' =>[
                'position' => 'navigation',
                'items' => NavbarResource::collection($menus)->response()->getData(true)
            ],
            'filters' => [
                'type' => CardsFilterResource::collection(InvitationCard::getCards())->response()->getData(true),
                'fairs' => FairFilterResource::collection($fairs)->response()->getData(true),
            ]
        ]);
    }
}
