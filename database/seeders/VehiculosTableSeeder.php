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
                'foto' => 'img/default/vehiculoDefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'nombre' => 'El papaMovil',
                'capacidad' => 2,
                'foto' => 'img/default/vehiculoDefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'nombre' => 'Honda corsa',
                'capacidad' => 4,
                'foto' => 'img/default/vehiculoDefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 3,
                'nombre' => 'Mercedes M de M',
                'capacidad' => 1,
                'foto' => 'img/default/vehiculoDefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
