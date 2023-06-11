<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusToInvitationCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invitation_cards', function (Blueprint $table) {
            $table->unsignedSmallInteger('status')->after('user_id');
            $table->unsignedBigInteger('card_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invitation_cards', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->unsignedBigInteger('card_id')->nullable(false)->change();
        });
    }
}
