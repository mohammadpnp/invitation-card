<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationCardsResource extends JsonResource
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
            'brand' => $this->brand,
            'logo' => $this->logo_url,
            'slogan' => $this->slogan,
            'saloon' => $this->saloon,
            'booth' => $this->booth,
            'description' => $this->description
        ];
    }
}
