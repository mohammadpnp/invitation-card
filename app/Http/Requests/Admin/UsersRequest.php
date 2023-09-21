<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UsersRequest extends FormRequest
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
            'mobile' => 'required|numeric|unique:' . User::class . ',mobile',
            'email' => 'nullable|email|unique:' . User::class . ',email',
            'address' => 'nullable|string|min:2|max:1024',
            'password' => 'required|min:8|confirmed',
        ];
    }
}
