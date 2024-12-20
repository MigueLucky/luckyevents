<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Vehiculos_eventosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehiculos_eventos')->insert([
            [
                'id_vehiculo' => 1,
                'id_evento' => 50,
                'ocupantes' => json_encode([1, 2]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_vehiculo' => 3,
                'id_evento' => 50,
                'ocupantes' => json_encode([1, 2]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_vehiculo' => 4,
                'id_evento' => 50,
                'ocupantes' => json_encode([1, 2]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
