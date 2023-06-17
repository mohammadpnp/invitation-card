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
            $table->string('manager_name')->nullable();
            $table->string('video_link')->nullable();
            $table->unsignedBigInteger('poem_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wedding_cards', function (Blueprint $table) {
            $table->dropColumn('manager_name');
            $table->dropColumn('video_link');
            $table->dropColumn('poem_id');
        });
    }
};
