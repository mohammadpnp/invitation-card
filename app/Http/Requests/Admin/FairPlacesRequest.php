<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class FairPlacesRequest extends FormRequest
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
            'is_internal' => 'required|boolean',
            'description' => 'required|max:2048',
            'poster' => ['nullable', File::types(['png', 'jpg', 'jpeg'])->max(1024)],
        ];
    }
}
