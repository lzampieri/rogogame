<?php 

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GamesController extends Controller {

    public function register( Request $request ) {
        $validated = $request->validate([
            'redtype'  => 'required|string|min:3|max:40',
            'blutype'  => 'required|string|min:3|max:40',
            'redpoints'=> 'required|integer',
            'blupoints'=> 'required|integer',
            'final_state'=> 'required|string|exists:strali_moves,id'
        ]);

        return Game::create( $validated );
    }

    public static function show( $query ) {
        return vsprintf( str_replace(['?'], ['\'%s\''], $query->toSql()), $query->getBindings() );
    }

    public static function count( $query ) {
        return [
            'total' =>  with( clone $query )->count(),
            'redwin' => with( clone $query )->whereColumn( 'redpoints', '>', 'blupoints' )->count(),
            'bluwin' => with( clone $query )->whereColumn( 'redpoints', '<', 'blupoints' )->count(),
        ];
    }

    public static function getStats() {

        return [
            'zeropl' => [
                'random' => GamesController::count( Game::where( 'redtype', 'random' )->where( 'blutype', 'random' ) ),
                'easy' => GamesController::count( Game::where( 'redtype', 'easy' )->where( 'blutype', 'easy' ) ),
                'medium' => GamesController::count( Game::where( 'redtype', 'medium' )->where( 'blutype', 'medium' ) ),
                'hard' => GamesController::count( Game::where( 'redtype', 'hard' )->where( 'blutype', 'hard' ) )
            ],
            'oneplr' => [
                'random' => GamesController::count( Game::where( 'redtype', 'real' )->where( 'blutype', 'random' ) ),
                'easy' => GamesController::count( Game::where( 'redtype', 'real' )->where( 'blutype', 'easy' ) ),
                'medium' => GamesController::count( Game::where( 'redtype', 'real' )->where( 'blutype', 'medium' ) ),
                'hard' => GamesController::count( Game::where( 'redtype', 'real' )->where( 'blutype', 'hard' ) )
            ],
            'oneplb' => [
                'random' => GamesController::count( Game::where( 'redtype', 'random' )->where( 'blutype', 'real' ) ),
                'easy' => GamesController::count( Game::where( 'redtype', 'easy' )->where( 'blutype', 'real' ) ),
                'medium' => GamesController::count( Game::where( 'redtype', 'medium' )->where( 'blutype', 'real' ) ),
                'hard' => GamesController::count( Game::where( 'redtype', 'hard' )->where( 'blutype', 'real' ) )
            ],
            'twopl' => GamesController::count( Game::where( 'redtype', 'real' )->where( 'blutype', 'real' ) ),
            'arena' => GamesController::count( Game::whereNotIn( 'redtype', ['random','easy','medium','hard','real'] )->whereNotIn( 'blutype',  ['random','easy','medium','hard','real'] ) )
        ];
    }
}