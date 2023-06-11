<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitationCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitation_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('company_members');
            $table->string('title');
            $table->string('url')->nullable();
            $table->string('card_type');
            $table->unsignedBigInteger('card_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_cards');
    }
}
