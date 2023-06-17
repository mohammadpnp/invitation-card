<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Poem extends Model
{
    use HasFactory;

    public function getVoiceUrlAttribute()
    {
        return $this->voice ? Storage::disk('poem_voices')->url($this->voice) : null;
    }
}
