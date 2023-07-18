<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaperCardResource;
use App\Http\Resources\PoemResource;
use App\Models\PaperCard;
use App\Models\Poem;
use Illuminate\Http\Request;

class PaperCardController extends Controller
{
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
