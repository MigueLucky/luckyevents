<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('eventos')->insert([
            [
                'nombre' => 'evento1',
                'privacidad' => true,
                'fechaHoraInicio' => now(),
                'fechaHoraFin' => now()->addYear(),
                'foto' => 'img/index/barbacoa.jpg',
                'descripcion' => 'evento1descripcion',
                'ubicacion' => 'valencia',
                'color' => '#00ffff',
                'links' => json_encode([
                    ['nombre' => 'hola', 'link' => 'https://hola.com'],
                    ['nombre' => 'hola2', 'link' => 'https://hola2.com']
                ]),
                'report' => false,
                'razonReport' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'evento2',
                'privacidad' => false,
                'fechaHoraInicio' => now(),
                'fechaHoraFin' => now()->addYear(),
                'foto' => 'img/index/deportes.jpg',
                'descripcion' => 'evento2descripcion',
                'ubicacion' => 'valencia',
                'color' => '#00ff00',
                'links' => json_encode([
                    ['nombre' => 'hola3', 'link' => 'https://hola3.com'],
                    ['nombre' => 'hola4', 'link' => 'https://hola4.com']
                ]),
                'report' => false,
                'razonReport' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'evento3',
                'privacidad' => false,
                'fechaHoraInicio' => now(),
                'fechaHoraFin' => now()->subYear(),
                'foto' => 'img/index/deportes.jpg',
                'descripcion' => 'evento3descripcion',
                'ubicacion' => 'valencia',
                'color' => '#00ff00',
                'links' => json_encode([
                    ['nombre' => 'hola3', 'link' => 'https://hola3.com'],
                    ['nombre' => 'hola4', 'link' => 'https://hola4.com']
                ]),
                'report' => false,
                'razonReport' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
