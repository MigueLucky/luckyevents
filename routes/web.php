<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\eventoController;
use App\Http\Controllers\foroController;
use App\Http\Controllers\mensajeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\vehiculoController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/terminos', function () {
    return view('terminosYPropositos');
})->name('terminos');

Route::get('/portada', function () {
    return view('portada');
});

Route::get('/perfil', function () {
    return view('perfil');
});

Route::get('/listaForos', function () {
    return view('listaForos');
});

Route::get('/listaEventos', function () {
    return view('listaEventos');
});

Route::resource('users', UserController::class);
Route::post('/login', [UserController::class, 'login']);
Route::resource('eventos', eventoController::class);
Route::resource('foros', foroController::class);
Route::resource('mensajes', mensajeController::class);
Route::resource('vehiculos', vehiculoController::class);