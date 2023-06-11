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
        Schema::table('fair_places', function (Blueprint $table) {
            $table->string('poster')->nullable();
            $table->boolean('is_internal')->default(true);
            $table->boolean('slider')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fair_places', function (Blueprint $table) {
            $table->dropColumn('poster');
            $table->dropColumn('is_internal');
            $table->dropColumn('slider');
        });
    }
};
