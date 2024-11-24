<?php

use Illuminate\Support\Facades\Route;

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