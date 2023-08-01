<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'company_name' => $this->company_name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'main_address' => $this->main_address,
            'main_phone' => $this->main_phone,
            'second_address' => $this->second_address,
            'second_phone' => $this->second_phone,
            'manager_name' => $this->manager_name,
        ];
    }
}
