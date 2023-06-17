<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaperCardResource extends JsonResource
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
            'title' => $this->title,
            'slogan' => $this->slogan,
            'saloon' => $this->saloon,
            'booth' => $this->booth,
            'started_at' => $this->started_at,
            'finished_at' => $this->finished_at,
            'fair' => new FairsResource($this->fair),
            'description' => $this->description,
            'manager_photo' => $this->manager_photo_url,
            'manager_name' => $this->manager_name,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'instagram_link' => $this->instagram_link,
            'youtube_link' => $this->youtube_link,
            'website_link' => $this->website_link,
            'video_link' => $this->video_link,
        ];
    }
}
