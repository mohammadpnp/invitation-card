<?php

namespace App\Http\Requests\InvitationCard;

use Illuminate\Foundation\Http\FormRequest;

class SubmitSurveyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'is_participate' => 'required|boolean',
            'come_datetime' => 'nullable|date',
            'note' => 'nullable|string',
        ];
    }
}
