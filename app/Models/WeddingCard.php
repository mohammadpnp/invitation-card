<?php

namespace App\Models;

use App\Traits\HasInvitationCard;
use App\Traits\HasMainPicture;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WeddingCard extends Model
{
    use HasFactory , HasMainPicture , HasInvitationCard;

    protected $fillable = [
        'card_id',
        'title',
        'started_at',
        'finished_at',
        'description',
        'address',
        'lat',
        'lng',
        'logo',
        'slogan',
        'brand',
        'instagram_link',
        'website_link',
        'youtube_link',
        'poster',
        'description_header',
        'description_footer',
        'manager_photo',
        'province',
        'city',
        'saloon',
        'booth',
        'fair_id',
        'have_poem',
    ];

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('wedding_card_picturs')->url($this->logo) : null;
    }

    public function getManagerPhotoUrlAttribute()
    {
        return $this->manager_photo ? Storage::disk('wedding_card_picturs')->url($this->manager_photo) : null;
    }

    public function getPosterUrlAttribute()
    {
        return $this->poster ? Storage::disk('wedding_card_picturs')->url($this->poster) : null;
    }

    public function fair()
    {
        return $this->belongsTo(Fair::class , 'fair_id');
    }

    public function poem()
    {
        return $this->belongsTo(Poem::class , 'poem_id');
    }

    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class , 'company_activity' , 'company_id' , 'activity_id');
    }

    public function scopeFilter($query, $request)
    {
        if (isset($request->get('filter')['tag_id'])) {
            $tagId = $request->get('filter')['tag'];
            $query->whereHas('activities',  function($query) use($tagId){
                $query->where('id' , $tagId);
            });
        }
    }

    public const TEMPLATE_TYPE_RECTANGLE = 1;
    public const TEMPLATE_TYPE_RECTANGLES = 2;
    public const TEMPLATE_TYPE_CIRCLE = 3;
    public const TEMPLATE_TYPE_CIRCLES = 4;
    public const TEMPLATE_TYPE_DIAMOND = 5;
    public const TEMPLATE_TYPE_DIAMONDS = 6;
    public const TEMPLATE_TYPE_TRIANGLES = 7;

    public static function getTemplateTitle(){
        return [
            self::TEMPLATE_TYPE_RECTANGLE => 'rectangle',
            self::TEMPLATE_TYPE_RECTANGLES => 'rectangles',
            self::TEMPLATE_TYPE_CIRCLE => 'circle',
            self::TEMPLATE_TYPE_CIRCLES => 'circles',
            self::TEMPLATE_TYPE_DIAMOND => 'diamond',
            self::TEMPLATE_TYPE_DIAMONDS => 'diamonds',
            self::TEMPLATE_TYPE_TRIANGLES => 'triangles',
        ];
    }
}
