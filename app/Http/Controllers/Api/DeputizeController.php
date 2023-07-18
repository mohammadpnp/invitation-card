<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeputizeResource;
use App\Models\Deputize;
use Illuminate\Http\Request;

class DeputizeController extends Controller
{
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
