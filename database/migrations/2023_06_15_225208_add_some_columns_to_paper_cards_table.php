<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('paper_cards', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('gender');
            $table->dropColumn('text');
            $table->dropColumn('address');

            $table->string('logo')->nullable();
            $table->string('slogan')->nullable();
            $table->string('brand')->nullable();
            $table->string('manager_photo')->nullable();
            $table->string('manager_name')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->unsignedBigInteger('fair_id')->nullable();
            $table->string('saloon')->nullable();
            $table->string('booth')->nullable();
            $table->boolean('have_poem');
            $table->unsignedBigInteger('border_id')->nullable();
            $table->text('description')->nullable();
            $table->string('video_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('website_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paper_cards', function (Blueprint $table) {
            $table->boolean('gender');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('text');
            $table->string('address');

            $table->dropColumn('logo');
            $table->dropColumn('slogan');
            $table->dropColumn('description');
            $table->dropColumn('province');
            $table->dropColumn('city');
            $table->dropColumn('fair_id');
            $table->dropColumn('saloon');
            $table->dropColumn('booth');
            $table->dropColumn('manager_photo');
            $table->dropColumn('manager_name');
            $table->dropColumn('brand');
            $table->dropColumn('have_poem');
            $table->dropColumn('border_id');
            $table->dropColumn('instagram_link');
            $table->dropColumn('website_link');
            $table->dropColumn('youtube_link');
            $table->dropColumn('video_link');
            $table->dropColumn('lat');
            $table->dropColumn('lng');
        });
    }
};
