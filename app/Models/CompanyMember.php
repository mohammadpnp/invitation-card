<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CompanyMember extends Authenticatable
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'company_name',
        'mobile',
        'email',
        'password',
        'manager_name',
        'file',
        'main_address',
        'main_phone',
        'second_address',
        'second_phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function fairs(): BelongsToMany
    {
        return $this->belongsToMany(Fair::class , 'company_fair', 'company_id', 'fair_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class , 'user_company', 'company_id', 'user_id');
    }

    public function cards()
    {
        return $this->hasMany(InvitationCard::class ,'user_id');
    }


}
