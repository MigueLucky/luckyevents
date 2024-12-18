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
                'id_evento' => 50,
                'id_foro' => null, 
                'contenido' => '¡Hola a todos al evento, espero que lo pasemos bien.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_usuario2' => null,
                'id_evento' => 50,
                'id_foro' => null, 
                'contenido' => 'Siiii que ganas tengo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => null,
                'id_evento' => 50,
                'id_foro' => null, 
                'contenido' => 'He comprado pastel de chocolate, que se que te gusta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_usuario2' => null,
                'id_evento' => 50,
                'id_foro' => null, 
                'contenido' => 'Yo al final no voy',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 2,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'Y eso que no vas al evento?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_usuario2' => 1,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'Soy alergico al cacao',
                'created_at' => now()->addSecond(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 2,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now()->addSeconds(2),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 3,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 4,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 5,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 6,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 7,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => 8,
                'id_evento' => null,
                'id_foro' => null, 
                'contenido' => 'A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_usuario2' => null,
                'id_evento' => null,
                'id_foro' => 1, 
                'contenido' => 'Bienvenidos al mejor foro',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_usuario2' => null,
                'id_evento' => null,
                'id_foro' => 1, 
                'contenido' => 'Hola buenas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 3,
                'id_usuario2' => null,
                'id_evento' => null,
                'id_foro' => 1, 
                'contenido' => 'Buenas a todos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
