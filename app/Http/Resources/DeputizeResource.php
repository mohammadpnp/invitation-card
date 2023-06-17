<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeputizeResource extends JsonResource
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
            'logo' => $this->logo_url,
            'slogan' => $this->slogan,
            'description' => $this->description,
            'products' => ProductResource::collection($this->products),
            'lat' => $this->lat,
            'lng' => $this->lng,
            'instagram_link' => $this->instagram_link,
            'youtube_link' => $this->youtube_link,
            'website_link' => $this->website_link,
            'video_link' => $this->video_link,
        ];
    }
}
