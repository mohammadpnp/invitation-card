<?php

namespace App\Http\Requests\Auth;

use App\Rules\CheckMobileNumber;
use Illuminate\Foundation\Http\FormRequest;

class CompanyRegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'company_name' => 'required|string',
            'mobile' => ['Required', 'Numeric', 'unique:company_members,mobile', new CheckMobileNumber()],
            'email' => 'nullable|email',
            'password' => 'required|min:8|confirmed',
            'manager_name' => 'nullable|string',
            'file' => 'nullable|file|max:5000',
            'activities' => 'Nullable|Array',
            'activities.*' => 'Nullable|exists:activities,id',
            'fairs' => 'Nullable|Array',
            'fairs.*' => 'Nullable|exists:fairs,id',
            'main_address' => 'required|string',
            'second_address' => 'Nullable|string',
            'main_phone' => 'Nullable|numeric',
            'second_phone' => 'Nullable|numeric',
        ];
    }
}
