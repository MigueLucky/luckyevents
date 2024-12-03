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
            ],
            [
                'id_usuario' => 2,
                'id_evento' => 1,
            ],
        ]);
    }
}
