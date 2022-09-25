<?php

use App\Http\Controllers\DataInsertionController;
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

Route::get('/game_1pl/{type}', function ($type) {
    return Inertia::render('GameAI', [ 'num_reals' => 1, 'type' => $type ] );
})->where('type', '(random|probs|squared_probs|fifth_probs)')
  ->name('game_1pl');

Route::get('/game_0pl/{type}', function ($type) {
    return Inertia::render('GameAI', [ 'num_reals' => 0, 'type' => $type ] );
})->where('type', '(random|probs|squared_probs|fifth_probs)')
  ->name('game_0pl');

Route::get('/data_insertion', [ DataInsertionController::class, 'interface' ] )->name('data_insertion');
Route::get('/data_insertion/{filename}', [ DataInsertionController::class, 'load' ] )->name('data_insertion.load');
Route::get('/data_insertion_truncate', [ DataInsertionController::class, 'truncate' ] )->name('data_insertion.truncate');