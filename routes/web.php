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

Route::get('/admin', function () {
    if (!Auth::check()) {
        return redirect('/');
    }

    $user = Auth::user();
    if(!$user->admin){
        return redirect('/portada');
    }

    return view('admin');
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
Route::post('/update/{id}', [UserController::class, 'update']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/cambiarContrasena/{id}', [UserController::class, 'cambiarContrasena']);

Route::resource('eventos', eventoController::class);
Route::post('/eventosPorUsuario', [EventoController::class, 'eventosPorUsuario']);
Route::get('/usuariosPorEvento/{id}', [EventoController::class, 'usuariosPorEvento']);
Route::get('/vehiculosPorEvento/{id}', [EventoController::class, 'vehiculosPorEvento']);
Route::post('/participarEvento/{id}', [EventoController::class, 'participarEvento']);
Route::post('/abandonarEvento/{id}', [EventoController::class, 'abandonarEvento']);

Route::resource('foros', foroController::class);

Route::resource('mensajes', mensajeController::class);
Route::post('/amigosPorUsuario', [mensajeController::class, 'amigosPorUsuario']);

Route::resource('vehiculos', vehiculoController::class);
Route::post('/vehiculosPorUsuario', [vehiculoController::class, 'vehiculosPorUsuario']);
Route::post('/addVehiculoEvento/{id}', [vehiculoController::class, 'addVehiculoEvento']);
Route::post('/removeVehiculoEvento/{id}', [vehiculoController::class, 'removeVehiculoEvento']);