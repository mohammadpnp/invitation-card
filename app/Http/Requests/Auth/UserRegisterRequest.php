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
            'activities' => 'Nullable|Array',
            'activities.*' => 'Nullable|exists:activities,id',
            'fairs' => 'Nullable|Array',
            'fairs.*' => 'Nullable|exists:fairs,id',
            'companies' => 'Nullable|Array',
            'companies.*' => 'Nullable|exists:company_members,id',
            'address' => 'Nullable|string',
        ];
    }
}
