<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class PoemsRequest extends FormRequest
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
            'poem' => 'required',
            'voice' => ['nullable', File::types(['mp3', 'wav'])
                ->max(5 * 1024)],
        ];
    }
}
