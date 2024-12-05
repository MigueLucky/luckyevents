<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\eventoController;
use App\Http\Controllers\foroController;
use App\Http\Controllers\mensajeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\vehiculoController;


Route::get('/login', function () {
    if (Auth::check()) {
        return redirect('/portada');
    }

    return view('welcome');
});

Route::get('/logout', function () {
    if (Auth::check()) {
        return redirect('/portada');
    }

    return view('welcome');
});

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/portada');
    }

    return view('welcome');
});

Route::get('/portada', function () {
    if (!Auth::check()) {
        return redirect('/');
    }

    return view('portada');
});

Route::get('/perfil', function () {
    if (!Auth::check()) {
        return redirect('/');
    }

    return view('perfil');
});

Route::get('/listaForos', function () {
    if (!Auth::check()) {
        return redirect('/');
    }

    return view('listaForos');
});

Route::get('/listaEventos', function () {
    if (!Auth::check()) {
        return redirect('/');
    }

    return view('listaEventos');
});

Route::get('/terminos', function () {
    return view('terminosYPropositos');
})->name('terminos');

Route::resource('users', UserController::class);
Route::post('/eventosPorUsuario', [EventoController::class, 'eventosPorUsuario']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/login', [UserController::class, 'login']);
Route::resource('eventos', eventoController::class);
Route::resource('foros', foroController::class);
Route::resource('mensajes', mensajeController::class);
Route::resource('vehiculos', vehiculoController::class);