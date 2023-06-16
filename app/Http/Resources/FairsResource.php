<?php

namespace App\Http\Resources;

use App\Models\FairPlace;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FairsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'poster' => $this->poster_url,
            'title' => $this->title,
            'presenter' => $this->presenter,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'place' => new FairPlace($this->place)
        ];
    }
}
