<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FairPlacesResource;
use App\Http\Resources\FairsResource;
use App\Models\Fair;
use App\Models\FairPlace;
use Illuminate\Http\Request;

class FairsController extends Controller
{
    public function index(Request $request)
    {

        $fairs = Fair::filter($request)
            ->with('fairPlace')
            ->orderByDesc('id')
            ->paginate($request->get('per_page',10));

        return $this->done([
            'fairs' => FairsResource::collection($fairs)->response()->getData(true)
        ]);
    }

    public function fairPlaces(Request $request)
    {
        $fairs = FairPlace::filter($request)
            ->orderByDesc('id')
            ->paginate($request->get('per_page',10));

        return $this->done([
            'fair_places' => FairPlacesResource::collection($fairs)->response()->getData(true)
        ]);
    }
}
