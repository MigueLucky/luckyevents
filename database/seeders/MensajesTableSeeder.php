<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MensajesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('mensajes')->insert([
            [
                'id_usuario' => 1,
                'id_usuario2' => null,
                'id_evento' => null,
                'id_foro' => 1, 
                'contenido' => '¡Hola a todos en el foro de Historia! Me encanta este tema.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => null,
                'id_evento' => 1,
                'id_foro' => null,
                'contenido' => 'Gracias por organizar este evento, está increíble.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 2,
                'id_evento' => null,
                'id_foro' => null,
                'contenido' => 'Ahora somos amigos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
