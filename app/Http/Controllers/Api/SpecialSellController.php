<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\BannerResorce;
use App\Http\Resources\FairsResource;
use App\Http\Resources\NavbarResource;
use App\Http\Resources\SpecialSellResource;
use App\Http\Resources\SpecialSellsResource;
use App\Models\Activity;
use App\Models\Fair;
use App\Models\Navbar;
use App\Models\SpecialSell;
use Illuminate\Http\Request;

class SpecialSellController extends Controller
{
    public function index(Request $request , $fairId)
    {
        $fair = Fair::with('fairPlace')->find($fairId);
        if (!$fair) {
            return $this->failed('نمایشگاه یافت نشد');
        }

        $specialSells = $fair->specialSells()
            ->filter($request)
            ->orderBy('weight', 'desc')
            ->get();

        $tags = Activity::where('type' , Activity::TYPE_AREA)->get();

        $menus = Navbar::all();

        return $this->done([
            'fair' => new FairsResource($fair),
            'special_sells' => SpecialSellsResource::collection($specialSells)->response()->getData(true),
            'banners' => new BannerResorce($fair->fairPlace),
            'menus' =>NavbarResource::collection($menus)->response()->getData(true),
            'filters' => [
                'tags' => ActivityResource::collection($tags)->response()->getData(true),
                'type' => [
                    [
                        'id' => 1,
                        'name' => 'کارت دعوت آنلاین',
                        'is_active' => false
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
                        'is_active' => true
                    ],
                ]
            ]
        ]);
    }

    public function show($id)
    {
        $specialSell = SpecialSell::with(['pictures','products'])->find($id);
        if(!$specialSell) {
            return $this->failed('آگهی فروش ویژه یافت نشد');
        }

        return $this->done([
            'special_sell' => new SpecialSellResource($specialSell),
        ]);
    }
}
