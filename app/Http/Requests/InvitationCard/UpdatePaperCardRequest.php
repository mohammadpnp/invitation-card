<?php

namespace App\Http\Requests\InvitationCard;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaperCardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'text' => 'required|string',
            'address' => 'required|string',
            'started_at' => 'required|Date',
            'finished_at' => 'required|Date|after:started_at',
            'gender' => 'required|boolean',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ];
    }
}
