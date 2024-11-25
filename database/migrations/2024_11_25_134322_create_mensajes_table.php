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
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_usuario2')->nullable();
            $table->unsignedBigInteger('id_evento')->nullable();
            $table->unsignedBigInteger('id_foro')->nullable();
            $table->text('contenido');
            $table->timestamps();

            $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_usuario2')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_evento')->references('id')->on('eventos')->onDelete('cascade');
            $table->foreign('id_foro')->references('id')->on('foros')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
