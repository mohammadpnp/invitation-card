<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialSellResource;
use App\Models\SpecialSell;
use Illuminate\Http\Request;

class SpecialSellController extends Controller
{
    public function show($id)
    {
        $specialSell = SpecialSell::with(['pictures','products'])->find($id);
        if(!$specialSell) {
            return $this->failed('آگهی فروش ویژه یافت نشد');
        }

        return $this->done([
            'SpecialSell' => new SpecialSellResource($specialSell),
        ]);
    }
}
