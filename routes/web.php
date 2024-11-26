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

Route::get('/foros', function () {
    return view('listaForos');
})->name('foros');

Route::get('/eventos', function () {
    return view('listaEventos');
})->name('eventos');

Route::resource('users', UserController::class);
Route::resource('eventos', eventoController::class);
Route::resource('foros', foroController::class);
Route::resource('mensajes', mensajeController::class);
Route::resource('vehiculos', vehiculoController::class);