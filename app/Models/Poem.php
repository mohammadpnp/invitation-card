<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Poem extends Model
{
    use HasFactory;

    protected $fillable = [
        'poem',
        'voice',
    ];

    public function getVoiceUrlAttribute()
    {
        return $this->voice ? Storage::disk('poem_voices')->url($this->voice) : null;
    }

    public function getArrayPoemAttribute()
    {
        if (str_contains($this->poem, '**')) {
            $array = explode("**", $this->poem);

            // Group every two columns into a new array
            $arrayPoem = [];
            for ($i = 0; $i < count($array); $i += 2) {
                $arrayPoem[] = [$array[$i], $array[$i + 1]];
            }
            return $arrayPoem;

        }else{
            return null;
        }
    }
}
