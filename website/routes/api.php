<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\MovesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get(
        '/move/{type}/{state}',
        [ MovesController::class, 'get' ]
    )
    ->where('type', '(random|probs|squared_probs|fifth_probs)')
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

Route::get(
    '/migrate',
    function() { Artisan::call('migrate'); }
);
Route::get(
    '/migrate_refresh',
    function() { Artisan::call('migrate:refresh'); }
);
Route::get(
    '/clear_cache',
    function() { Artisan::call('cache:clear'); }
);