<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'admin' => true,
                'nombre' => 'Admin',
                'apellido' => null,
                'email' => '1',
                'password' => Hash::make('1'),
                'foto' => "img/avatarPredeterminado/avatarAzul.png",
                'ubicacionFavorita' => null,
                'leyenda' => null,
                'gustos' => json_encode(["deportes"]),
                'bloqueado' => false,
                'email_verified_at' => now(),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin' => false,
                'nombre' => 'Usuario',
                'apellido' => null,
                'email' => '2',
                'password' => Hash::make('2'),
                'foto' => "img/avatarPredeterminado/avatarRojo.png",
                'ubicacionFavorita' => null,
                'leyenda' => null,
                'gustos' => json_encode(["deportes", "educacion"]),
                'bloqueado' => false,
                'email_verified_at' => now(),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
