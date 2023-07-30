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
        Schema::table('wedding_cards', function (Blueprint $table) {
            $table->string('manager_position')->nullable();
            $table->string('manager_description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wedding_cards', function (Blueprint $table) {
            $table->dropColumn('manager_position');
            $table->dropColumn('manager_description');
        });
    }
};
