<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'mobile',
        'password',
        'address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class , 'user_activity' , 'user_id' , 'activity_id');
    }

    public function fairs(): BelongsToMany
    {
        return $this->belongsToMany(Fair::class , 'user_fair', 'user_id', 'fair_id');
    }

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(CompanyMember::class , 'user_company', 'user_id', 'company_id');
    }
}
