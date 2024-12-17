<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForosTableSeeder extends Seeder
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
            "img/default/foroDefault.jpg"
        ];

        // Ubicaciones disponibles
        $ubicaciones = ['Valencia', 'Castellon', 'Alicante', 'Madrid', 'Malaga'];

        // Crear 50 foros
        for ($i = 1; $i <= 50; $i++) {
            $esReportado = $i <= 10;

            DB::table('foros')->insert([
                'nombre' => 'Foro ' . $i,
                'foto' => $fotos[array_rand($fotos)],
                'descripcion' => 'Descripción del Foro ' . $i,
                'ubicacion' => $ubicaciones[array_rand($ubicaciones)],
                'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)),
                'report' => $esReportado,
                'razonReport' => $esReportado ? 'Razón de reporte del foro ' . $i : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}