<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('TitlePage');
});

Route::get('/game_ai/{type}', function ($type) {
    return Inertia::render('GameAI', [ 'type' => $type ] );
})->where('type', '(random|probs|squared_probs|win)')
  ->name('game_ai');

Route::get('/NewPage', function () {
    return Inertia::render('NewPage');
})->name('new_page');

Route::get('/NewPageTwo', function () {
    return Inertia::render('NewPageTwo');
})->name('new_page_two');

Route::get('/NewPageThree', function () {
    return Inertia::render('NewPageTwo');
})->name('new_page_three');
