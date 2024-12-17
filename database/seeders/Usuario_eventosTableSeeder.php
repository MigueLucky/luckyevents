<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Usuario_eventosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuario_eventos')->insert([
            [
                'id_usuario' => 1,
                'id_evento' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 23,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_evento' => 42,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 3,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 4,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 5,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 6,
                'id_evento' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
