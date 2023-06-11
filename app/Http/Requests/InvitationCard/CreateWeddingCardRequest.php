<?php

namespace App\Http\Requests\InvitationCard;

use Illuminate\Foundation\Http\FormRequest;

class CreateWeddingCardRequest extends FormRequest
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
            'start_date' => 'required|Date',
            'finish_date' => 'required|Date',
            'start_time' => 'required|string',
            'finish_time' => 'required|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'saloon' => 'nullable|string',
            'booth' => 'nullable|string',
            'fair_id' => 'required|exists:fair_places,id',
            'brand' => 'required|string',
            'slogan' => 'nullable|string',
            'instagram_link' => 'nullable|string',
            'website_link' => 'nullable|string',
            'youtube_link' => 'nullable|string',
            'description' => 'required|string',
            'description_header' => 'required|string',
            'description_footer' => 'required|string',
            'address' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'have_survey' => 'required|boolean',
            'have_poem' => 'required|boolean',
            'file1' => 'required|Image|mimes:jpg,png,jpeg||max:5000',
            'file2' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
            'file3' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
            'file4' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
            'logo' => 'required|Image|mimes:jpg,png,jpeg||max:5000',
            'manager_photo' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
            'poster' => 'nullable|Image|mimes:jpg,png,jpeg||max:5000',
        ];
    }
}
