<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function company(): BelongsToMany
    {
        return $this->belongsToMany(CompanyMember::class, 'company_activity', 'activity_id' , 'company_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_activity', 'activity_id' , 'user_id');
    }
}
