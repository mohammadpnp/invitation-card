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
        Schema::create('deputizes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('company_members');
            $table->string('logo')->nullable();
            $table->string('slogan')->nullable();
            $table->string('brand')->nullable();
            $table->text('description')->nullable();
            $table->string('video_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('website_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deputizes');
    }
};
