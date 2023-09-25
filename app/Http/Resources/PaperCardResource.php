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
            'logo' => $this->logo,
            'title' => $this->title,
            'slogan' => $this->slogan,
            'saloon' => (float)$this->saloon,
            'booth' => (float)$this->booth,
            'started_at' => $this->started_at,
            'finished_at' => $this->finished_at,
            'fair' => new FairsResource($this->fair),
            'description' => $this->description,
            'manager_photo' => $this->manager_photo,
            'manager_name' => $this->manager_name,
            'lat' => (float)$this->lat,
            'lng' => (float)$this->lng,
            'instagram_id' => $this->instagram_link,
            'youtube_id' => $this->youtube_link,
            'website_link' => $this->website_link,
            'video_link' => $this->video_link,
            'template_type' => 1,
        ];
    }
}
