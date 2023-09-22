<?php

namespace App\Http\Requests\Admin;

use App\Models\Description;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DescriptionsRequest extends FormRequest
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
            'type' => ['required', Rule::in([Description::TYPE_HEADER, Description::TYPE_MAIN, Description::TYPE_FOOTER])],
            'description' => 'required|max:5200'
        ];
    }
}
