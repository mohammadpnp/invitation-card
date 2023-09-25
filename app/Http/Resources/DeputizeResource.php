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
            'logo' => $this->logo,
            'slogan' => $this->slogan,
            'description' => $this->description,
            'products' => ProductResource::collection($this->products),
            'lat' => (float)$this->lat,
            'lng' => (float)$this->lng,
            'instagram_id' => $this->instagram_link,
            'youtube_id' => $this->youtube_link,
            'website_link' => $this->website_link,
            'video_link' => $this->video_link,
            'template_type' => 2,
        ];
    }
}
