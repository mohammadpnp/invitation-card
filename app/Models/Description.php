<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    use HasFactory;


    public const TYPE_HEADER = 1;
    public const TYPE_MAIN = 2;
    public const TYPE_FOOTER = 3;

}
