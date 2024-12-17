<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventosTableSeeder extends Seeder
{
    public function run(): void
    {
        // Fotos disponibles
        $fotos = [
            "img/index/barbacoa.jpg",
            "img/index/cumpleanos.jpg",
            "img/index/deportes.jpg",
            "img/index/examen.jpg",
            "img/index/gaming.jpg",
            "img/index/gym.jpg",
            "img/index/paella.jpg",
            "img/index/viajes.jpg",
            "img/default/eventoDefault.png"
        ];

        // Ubicaciones disponibles
        $ubicaciones = ['Valencia', 'Castellon', 'Alicante', 'Madrid', 'Malaga'];

        // Crear 50 eventos
        for ($i = 1; $i <= 50; $i++) {
            $esReportado = $i <= 10; // Los primeros 10 eventos están reportados
            $fechaInicio = now();
            $fechaFin = $i <= 5 
                ? now()->subYear() // 5 eventos finalizaron hace un año
                : $fechaInicio->copy()->addDays(rand(1, 10)); // Otros con fecha futura o cercana

            DB::table('eventos')->insert([
                'nombre' => 'Evento ' . $i,
                'privacidad' => $i > 49, // Primeros 49 eventos son privados, el 50 es público
                'fechaHoraInicio' => $fechaInicio,
                'fechaHoraFin' => $fechaFin,
                'foto' => $fotos[array_rand($fotos)], // Foto aleatoria
                'descripcion' => 'Descripción del Evento ' . $i,
                'ubicacion' => $ubicaciones[array_rand($ubicaciones)], // Ubicación aleatoria
                'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)), // Color aleatorio
                'links' => json_encode([
                    ['nombre' => 'Video de ejemplo', 'link' => 'https://link' . $i . '.com'],
                    ['nombre' => 'Pagina web para comprar lo necesario', 'link' => 'https://link' . ($i + 1) . '.com']
                ]),
                'report' => $esReportado,
                'razonReport' => $esReportado ? 'Razón de reporte para el evento ' . $i : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
