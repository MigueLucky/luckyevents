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
Route::put('/users/{user}/bloquear', [UserController::class, 'bloquear'])->name('users.bloquear');
Route::patch('/users/{user}/bloquear', [UserController::class, 'desbloquear'])->name('users.desbloquear');

Route::resource('eventos', eventoController::class);
Route::post('/eventosPorUsuario', [EventoController::class, 'eventosPorUsuario']);
Route::get('/usuariosPorEvento/{id}', [EventoController::class, 'usuariosPorEvento']);
Route::get('/vehiculosPorEvento/{id}', [EventoController::class, 'vehiculosPorEvento']);
Route::post('/participarEvento/{id}', [EventoController::class, 'participarEvento']);
Route::post('/abandonarEvento/{id}', [EventoController::class, 'abandonarEvento']);
Route::get('/eventosPorUbiFavorita', [EventoController::class, 'eventosPorUbiFavorita']);
Route::patch('/eventos/{evento}/quitarReporte', [EventoController::class, 'quitarReporte'])->name('eventos.quitarReporte');
Route::post('/reportarEvento/{id}', [EventoController::class, 'reportarEvento'])->name('reportarEvento');

Route::resource('foros', foroController::class);
Route::patch('/foros/{foro}/quitarReporte', [ForoController::class, 'quitarReporte'])->name('foros.quitarReporte');
Route::post('/forosPorUsuario', [foroController::class, 'forosPorUsuario']);
Route::get('/usuariosPorForo/{id}', [foroController::class, 'usuariosPorForo']);
Route::post('/reportarForo/{id}', [foroController::class, 'reportarForo'])->name('reportarForo');
Route::post('/participarForo/{id}', [foroController::class, 'participarForo']);
Route::post('/abandonarForo/{id}', [foroController::class, 'abandonarForo']);

Route::resource('mensajes', mensajeController::class);
Route::post('/amigosPorUsuario', [mensajeController::class, 'amigosPorUsuario']);
Route::get('/mensajes/usuario/{idUsuario}/{idAmigo}/{tipo}', [MensajeController::class, 'obtenerMensajes']);
Route::get('/mensajes/foro/{idUsuario}/{id}/{tipo}', [MensajeController::class, 'obtenerMensajes']);
Route::get('/mensajes/evento/{idUsuario}/{id}/{tipo}', [MensajeController::class, 'obtenerMensajes']);
Route::post('/mensajes/usuario/{idUsuario}', [MensajeController::class, 'enviarMensaje']);

Route::resource('vehiculos', vehiculoController::class);
Route::post('/vehiculosPorUsuario', [vehiculoController::class, 'vehiculosPorUsuario']);
Route::post('/addVehiculoEvento/{id}', [vehiculoController::class, 'addVehiculoEvento']);
Route::post('/removeVehiculoEvento/{id}', [vehiculoController::class, 'removeVehiculoEvento']);