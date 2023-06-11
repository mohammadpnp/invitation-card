<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Fair extends Model
{
    use HasFactory;

    public function company(): BelongsToMany
    {
        return $this->belongsToMany(CompanyMember::class, 'company_fair' , 'fair_id' , 'company_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_fair' , 'fair_id' , 'user_id');
    }
}
