<?php 

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GamesController extends Controller {

    public function register( Request $request ) {
        $validated = $request->validate([
            'redtype'  => 'required|string|min:3|max:16',
            'blutype'  => 'required|string|min:3|max:16',
            'redpoints'=> 'required|integer',
            'blupoints'=> 'required|integer',
            'final_state'=> 'required|string|exists:strali_moves,id'
        ]);

        return Game::create( $validated );
    }

}