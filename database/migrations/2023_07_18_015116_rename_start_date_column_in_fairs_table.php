<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('fairs', function (Blueprint $table) {
            $table->dateTime('start_date')->change();
            $table->renameColumn('start_date', 'start_date_at');
            $table->dateTime('end_date')->change();
            $table->renameColumn('end_date', 'end_date_at');
        });
    }

    public function down()
    {
        Schema::table('fairs', function (Blueprint $table) {
            $table->date('start_date_at')->change();
            $table->renameColumn('start_date_at', 'start_date');
            $table->date('end_date_at')->change();
            $table->renameColumn('end_date_at', 'end_date');
        });
    }
};
