<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeddingCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wedding_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('card_id')->constrained('invitation_cards');
            $table->string('title', 1024);
            $table->dateTime('started_at');
            $table->string('header_picture')->nullable();
            $table->text('description')->nullable();
            $table->string('address', 500)->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->boolean('have_survey')
                ->default(false)
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wedding_cards');
    }
}
