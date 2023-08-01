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
        Schema::table('deputizes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->unsignedBigInteger('card_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deputizes', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('company_members');
            $table->dropColumn('card_id');
        });
    }
};
