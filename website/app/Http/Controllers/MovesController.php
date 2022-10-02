<?php 

namespace App\Http\Controllers;

use App\Models\Move;
use App\Utils\GameState;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MovesController extends Controller {

    public function parse( $state ) {
        $parsed = GameState::fromID( $state );
        $present = Move::find( $state );
        return $parsed->toString() . "<br/>Id: " . number_format( $parsed->getId() ) . "<br/>" . ( $present ? 'Present in database' : 'Not present in database' );
    }

    public function get( $type, $state ) {

        // Retrive the state
        try {
            $the_state = Move::findOrFail( $state );
        } catch (ModelNotFoundException $e) {
            return response( 'State not found', 404 );
        }

        // Check if can be evolved
        if( count( $the_state->PossibleArrows ) == 0 ) {
            return response( 'State already final', 404 );
        }

        // Collect all possible moves and their probability
        $next_move = array();
        foreach( $the_state->PossibleArrows as $arrow ) {

            $parsed_state = GameState::fromMove( $the_state );
            $parsed_state->add( $arrow );
            try {
                $new_state = $parsed_state->getMove();
            } catch (ModelNotFoundException $e) {
                return response( 'Error in the database. Cannot find ' . $parsed_state->getId(), 404 );
            }

            $next_move[ $arrow ] = $new_state->WinProb + $new_state->TieProb / 10;
        
            if( $type == 'random' )
                $next_move[ $arrow ] ** 0;
            elseif( $type == 'probs' )
                $next_move[ $arrow ] ** 1;
            elseif( $type == 'squared_probs' )
                $next_move[ $arrow ] ** 2;
            elseif( $type == 'fifth_probs' )
                $next_move[ $arrow ] ** 5;
        }

        // Get total
        $total = array_sum( $next_move );

        // If no win prob, all have same prob
        if( $total == 0 ) {
            foreach( $next_move as &$move ) {
                $move = 0.1;
                $total += 0.1;
            }
        }

        // Generate a random number between 0 and total
        $choice = mt_rand( 0, mt_getrandmax() - 1 ) / mt_getrandmax() * $total;

        // Select a move using cumulative pdf
        foreach( $next_move as $arrow => $prob ) {
            if( $choice < $prob )
                return $arrow;
            else
                $choice -= $prob;
        }

        return response( 'Error in the algorithm', 404 );
    }

}