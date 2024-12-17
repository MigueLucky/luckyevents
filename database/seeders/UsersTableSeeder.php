<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Avatares disponibles
        $avatares = [
            "img/avatarPredeterminado/avatarAmarillo.png",
            "img/avatarPredeterminado/avatarAzul.png",
            "img/avatarPredeterminado/avatarAzulVerde.png",
            "img/avatarPredeterminado/avatarMagenta.png",
            "img/avatarPredeterminado/avatarRojo.png",
            "img/avatarPredeterminado/avatarVerde.png"
        ];

        // Ubicaciones disponibles
        $ubicaciones = ['Valencia', 'Castellon', 'Alicante', 'Madrid', 'Malaga'];

        // Leyendas disponibles
        $leyendas = [
            'creador de eventos',
            'el animador',
            'cocinero oficial',
            'fotógrafo de eventos',
            'ladron de comida',
            'lofi boy',
            'lofi girl',
            'dj urbano (solo sabe usar spotify)'
        ];

        // Crear 15 usuarios
        for ($i = 1; $i <= 15; $i++) {
            DB::table('users')->insert([
                'admin' => $i === 1, // Solo el usuario 1 es admin
                'nombre' => 'Usuario' . $i,
                'apellido' => null,
                'email' => 'usuario' . $i . '@gmail.com',
                'password' => Hash::make('usuario' . $i),
                'foto' => $avatares[array_rand($avatares)], // Avatar aleatorio
                'ubicacionFavorita' => $ubicaciones[array_rand($ubicaciones)], // Ubicación aleatoria
                'leyenda' => $leyendas[array_rand($leyendas)], // Leyenda aleatoria
                'bloqueado' => $i > 10, // Últimos 5 usuarios bloqueados
                'email_verified_at' => now(),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}