<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            EventosTableSeeder::class,
            ForosTableSeeder::class,
            MensajesTableSeeder::class,
            Usuario_eventosTableSeeder::class,
            Usuario_forosTableSeeder::class,
            VehiculosTableSeeder::class,
        ]);
    }
}
