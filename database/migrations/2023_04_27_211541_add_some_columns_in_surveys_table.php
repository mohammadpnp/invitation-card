<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSomeColumnsInSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('mobile');

            $table->foreignId('user_id')->after('card_id')->constrained('users');
            $table->dateTime('come_datetime')->nullable()->after('is_participate');
            $table->boolean('is_participate')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->string('name');
            $table->string('mobile');

            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn('come_datetime');
            $table->boolean('is_participate')->nullable(false)->change();
        });
    }
}
