<?php

namespace App\Http\Requests\InvitationCard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWeddingCardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'started_at' => 'required|Date',
            'finished_at' => 'required|Date|after:started_at',
            'have_survey' => 'required|boolean',
            'header_picture' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
        ];
    }
}
