<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('foros')->insert([
            [
                'nombre' => 'Foro de Historia',
                'foto' => 'img/index/examen.jpg',
                'descripcion' => 'Un espacio para los amantes de la historia y los debates históricos.',
                'ubicacion' => 'Madrid',
                'color' => '#ff5733',
                'report' => false,
                'razonReport' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Foro de Tecnología',
                'foto' => 'img/index/gym.jpg',
                'descripcion' => 'Discusión sobre los últimos avances y tendencias en tecnología.',
                'ubicacion' => 'Barcelona',
                'color' => '#33ff57',
                'report' => false,
                'razonReport' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
