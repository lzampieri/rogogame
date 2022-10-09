<?php

use App\Http\Controllers\AblyTokenCreator;
use App\Http\Controllers\DataInsertionController;
use Illuminate\Support\Facades\Artisan;
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
    return redirect() -> route( 'home' );
});

Route::get('/home/', function () {
    return Inertia::render( 'TitlePage', [ 'home' => true ] );
})
  ->name('home');

Route::get('/game/', function () {
    return Inertia::render( 'TitlePage', [ 'select_players' => true ] );
})
  ->name('game.select_players');

Route::get('/game/{pl}', function ( $pl ) {
    return Inertia::render( 'TitlePage', [ 'select_smartness' => true, 'pl' => $pl ] );
})->where( 'pl', '(0pl|1pl|2pl)' )
  ->name('game.select_smartness');

Route::get('/game/{pl}/{type}', function ( $pl, $type ) {
    return Inertia::render( 'GamePage', [ 'pl' => $pl, 'type' => $type ] );
})->where( 'pl', '(0pl|1pl|2pl)' )
  ->where('type', '(random|probs|squared_probs|fifth_probs)')
  ->name('game.play');

Route::get('/rules', function () {
  return Inertia::render( 'RulesPage' );
})->name('rules');

Route::get('/about', function () {
  return Inertia::render( 'AboutPage' );
})->name('about');

Route::get('/arena', function () {
  return Inertia::render( 'ArenaPage', [ 'ably' => AblyTokenCreator::getAblyParams() ] );
})->name('arena');

Route::get('/game/multiplayer/{against}/{role}', function ( $against, $role ) {
  return Inertia::render( 'OnlineGamePage', [
    'ably' => AblyTokenCreator::getAblyParams(), 
    'against' => $against,
    'role' => $role ] );
})->where('role', '(master|slave)')
  ->name('game.multiplayer');


// Various utilities
Route::get('/utilities', function () { return view('utilities'); } )->name('utilites');
Route::get('/data_insertion', [ DataInsertionController::class, 'interface' ] )->name('data_insertion');
Route::get('/data_insertion/{filename}', [ DataInsertionController::class, 'load' ] )->name('data_insertion.load');
Route::get('/data_insertion_truncate', [ DataInsertionController::class, 'truncate' ] )->name('data_insertion.truncate');
Route::get('/migrate', function() { return Artisan::call('migrate'); } )->name('migrate');
Route::get('/clear_cache', function() { return Artisan::call('cache:clear'); } )->name('clear_cache');
Route::get('/get_ably_params', function() { return AblyTokenCreator::getAblyParams(); } )->name('get_ably_params');
Route::get('/get_client_id', function() { return AblyTokenCreator::getClientId(); } )->name('get_client_id');
Route::get('/clear_client_id', function() { return AblyTokenCreator::clearClientId(); } )->name('clear_client_id');