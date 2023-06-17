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
        Schema::table('users', function (Blueprint $table) {
            $table->string('description')->nullable();
            $table->string('education')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('skills')->nullable();
            $table->string('company_name')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('education');
            $table->dropColumn('field_of_study');
            $table->dropColumn('skills');
            $table->dropColumn('company_name');
        });
    }
};
