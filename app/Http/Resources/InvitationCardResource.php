<?php

namespace App\Http\Resources;

use App\Models\Fair;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationCardResource extends JsonResource
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
            'saloon' => (float)$this->saloon,
            'booth' => (float)$this->booth,
            'started_at' => $this->started_at,
            'finished_at' => $this->finished_at,
            'fair' => new FairsResource($this->fair),
            'description_header' => $this->description_header,
            'description_footer' => $this->description_footer,
            'description' => $this->description,
            'manager_photo' => $this->manager_photo_url,
            'manager_name' => $this->manager_name,
            'lat' => (float)$this->lat,
            'lng' => (float)$this->lng,
            'instagram_id' => $this->instagram_link,
            'youtube_id' => $this->youtube_link,
            'website_link' => $this->website_link,
            'video_link' => $this->video_link,
            'template_type' => $this->template_type
        ];
    }
}
