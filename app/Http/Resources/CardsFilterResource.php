<?php

namespace App\Http\Resources;

use App\Models\InvitationCard;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardsFilterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $id = array_search($this->resource , InvitationCard::getCards());
        return [
            'id' => $id,
            'name' => InvitationCard::getCardsTitle()[$this->resource],
            'is_active' => in_array($id,$request->get('filter')['type'] ?? [])
        ];
    }
}
