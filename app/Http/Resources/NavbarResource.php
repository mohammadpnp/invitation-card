<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NavbarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'position' => 'navigation',
            'items' => [
                'title' => $this->title,
                'icon' => $this->icon,
                'link' => $this->link,
                'target' => '_self'
            ]
        ];
    }
}
