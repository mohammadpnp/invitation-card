<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResorce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                'title' => $this->name,
                'image' => $this->poster,
                'link' => get_class($this->resource) == FairPlacesResource::class ? route('api.fair-places') : route('api.fairs'),
                'target' => '_self'
        ];

    }
}
