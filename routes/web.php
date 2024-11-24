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