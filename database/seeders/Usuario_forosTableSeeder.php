<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Usuario_forosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuario_foros')->insert([
            [
                'id_usuario' => 1,
                'id_foro' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_foro' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
