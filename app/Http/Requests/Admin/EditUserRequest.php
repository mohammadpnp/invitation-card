<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;

class EditUserRequest extends FormRequest
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
            'first_name' => 'required|string|min:2|max:64',
            'last_name' => 'required|string|min:2|max:64',
            'mobile' => ['required', 'numeric', Rule::unique('users','mobile')->ignore($this->mobile, 'mobile')],
            'email' => ['nullable', 'email', Rule::unique('users','email')->ignore($this->email, 'email')],
            'address' => 'nullable|string|min:2|max:1024',
        ];
    }
}
