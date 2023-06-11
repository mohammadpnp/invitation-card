<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSomeColumnsToWeddingCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('wedding_cards', function (Blueprint $table) {
            $table->string('logo')->nullable();
            $table->string('slogan')->nullable();
            $table->string('brand')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('website_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('poster')->nullable();
            $table->string('description_header')->nullable();
            $table->string('description_footer')->nullable();
            $table->string('manager_photo')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->unsignedBigInteger('fair_id')->nullable();
            $table->string('saloon')->nullable();
            $table->string('booth')->nullable();
            $table->boolean('have_poem');
            $table->dropColumn('header_picture');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('wedding_cards', function (Blueprint $table) {
            $table->dropColumn('logo');
            $table->dropColumn('slogan');
            $table->dropColumn('instagram_link');
            $table->dropColumn('website_link');
            $table->dropColumn('youtube_link');
            $table->dropColumn('poster');
            $table->dropColumn('description_header');
            $table->dropColumn('description_footer');
            $table->dropColumn('province');
            $table->dropColumn('city');
            $table->dropColumn('fair_id');
            $table->dropColumn('saloon');
            $table->dropColumn('booth');
            $table->dropColumn('manager_photo');
            $table->dropColumn('brand');
            $table->dropColumn('have_poem');
            $table->string('header_picture')->nullable();

        });
    }
}
