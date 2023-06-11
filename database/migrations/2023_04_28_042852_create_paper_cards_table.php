<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaperCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paper_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('card_id')->constrained('invitation_cards');
            $table->string('title');
            $table->boolean('gender');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('text');
            $table->dateTime('started_at');
            $table->dateTime('finished_at');
            $table->string('address');
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
        Schema::dropIfExists('paper_cards');
    }
}
