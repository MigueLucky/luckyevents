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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->boolean('privacidad');
            $table->timestamp('fechaHoraInicio');
            $table->timestamp('fechaHoraFin');
            $table->string('foto')->nullable();
            $table->string('descripcion')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('color')->nullable();
            $table->json('links')->nullable();
            $table->boolean('report')->default(false);
            $table->string('razonReport')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
