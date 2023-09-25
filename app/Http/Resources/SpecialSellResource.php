<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialSellResource extends JsonResource
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
            'main_pictures' => AttachmentResource::collection($this->pictures),
            'brand' => $this->brand,
            'logo' => $this->logo,
            'slogan' => $this->slogan,
            'description' => $this->description,
            'products' => ProductResource::collection($this->products),
            'template_type' => 3,
        ];
    }
}
