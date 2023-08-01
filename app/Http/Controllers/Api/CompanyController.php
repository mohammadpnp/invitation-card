<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\CompanyCardListResource;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\DeputizeResource;
use App\Http\Resources\FairsResource;
use App\Http\Resources\InvitationCardResource;
use App\Http\Resources\InvitationCardsResource;
use App\Http\Resources\NavbarResource;
use App\Http\Resources\PaperCardResource;
use App\Http\Resources\SpecialSellResource;
use App\Models\CompanyMember;
use App\Models\Deputize;
use App\Models\Fair;
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

        if (isset($request->get('filter')['invitation_card']) && $request->get('filter')['invitation_card']) {
            $companyCards = $companyCards->where('card_type', WeddingCard::class);
        }
        if (isset($request->get('filter')['paper_card']) && $request->get('filter')['paper_card']) {
            $companyCards = $companyCards->where('card_type', PaperCard::class);
        }
        if (isset($request->get('filter')['deputize']) && $request->get('filter')['deputize']) {
            $companyCards = $companyCards->where('card_type', Deputize::class);
        }
        if (isset($request->get('filter')['special_sell']) && $request->get('filter')['special_sell']) {
            $companyCards = $companyCards->where('card_type', SpecialSell::class);
        }

        $cards =[];
        foreach ($companyCards as $invitationCard){
            $cards[] = new InvitationCardResource($invitationCard->card);
        }

        $menus = Navbar::all();

        return $this->done([
            'company' => new CompanyResource($company),
            'cards' => InvitationCardsResource::collection($cards)->response()->getData(true),
            'menus' => NavbarResource::collection($menus)->response()->getData(true),
            'filters' => [
                'type' => [
                    [
                        'id' => 1,
                        'name' => 'کارت دعوت آنلاین',
                        'is_active' => true
                    ],
                    [
                        'id' => 2,
                        'name' => 'لوح تقدیر آنلاین',
                        'is_active' => false
                    ],
                    [
                        'id' => 3,
                        'name' => 'آگهی فروش ویژه',
                        'is_active' => false
                    ],
                    [
                        'id' => 4,
                        'name' => 'آگهی اعطای نمایندگی',
                        'is_active' => false
                    ],
                ]
            ]
        ]);
    }
}
