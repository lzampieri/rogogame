<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\MovesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get(
        '/move/{type}/{state}',
        [ MovesController::class, 'get' ]
    )
    ->where('type', '(random|easy|medium|hard)')
    ->name('api_move');

Route::get(
    '/move_parse/{state}',
    [ MovesController::class, 'parse' ]
    )
    ->name('api_parse');

Route::post(
    '/game/register',
    [ GamesController::class, 'register' ]
    )
    ->name('api_game_register');