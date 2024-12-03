<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiculosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehiculos')->insert([
            [
                'id_usuario' => 1,
                'nombre' => 'Toyota Corolla',
                'capacidad' => 5,
                'foto' => 'img/vehiculos/toyota_corolla.jpg',
                'ocupantes' => json_encode([1, 2]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
