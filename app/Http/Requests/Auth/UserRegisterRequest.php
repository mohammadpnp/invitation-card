<?php

namespace App\Http\Requests\Auth;

use App\Rules\CheckMobileNumber;
use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'mobile' => ['Required', 'Numeric', new CheckMobileNumber()],
            'email' => 'nullable|email',
            'address' => 'Nullable|string',
            'description' => 'Nullable|string',
            'education' => 'Nullable|string',
            'field_of_study' => 'Nullable|string',
            'skill' => 'Nullable|string',
            'company_name' => 'Nullable|string',
        ];
    }
}
