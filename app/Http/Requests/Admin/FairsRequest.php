<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class FairsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:64',
            'place' => 'required|max:64',
            'city' => 'required|max:64',
            'title' => 'required|max:64',
            'salon' => 'required|max:64',
            'poster' => ['nullable', File::types(['png', 'jpg', 'jpeg'])->max(1024)],
            'start_date_at' => '',
            'end_date_at' => '',
            'presenter' => 'required|max:64',
            'fair_place_id' => 'required|exists:fair_places,id',
        ];
    }
}
