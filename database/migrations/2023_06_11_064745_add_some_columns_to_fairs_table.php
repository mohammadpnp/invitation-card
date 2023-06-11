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
        Schema::table('fairs', function (Blueprint $table) {
            $table->string('poster')->nullable();
            $table->dropColumn('date');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('presenter')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fairs', function (Blueprint $table) {
            $table->dropColumn('poster');
            $table->dropColumn('start_date');
            $table->dropColumn('end_date');
            $table->dropColumn('presenter');
            $table->date('date')->nullable();

        });
    }
};
