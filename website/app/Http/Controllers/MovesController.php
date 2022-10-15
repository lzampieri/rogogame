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

        // echo "State: " . $the_state->toStringProbs() . "<br/><br/>";

        // Collect all possible moves and their probability
        $next_move = array();
        $next_states_win_prob = array();
        $next_states_tie_prob = array();
        $max_win_prob = 0;
        $max_tie_prob = 0;

        foreach( $the_state->PossibleArrows as $arrow ) {

            $parsed_state = GameState::fromMove( $the_state );

            $parsed_state->add( $arrow );
            try {
                $new_state = $parsed_state->getMove();
            } catch (ModelNotFoundException $e) {
                return response( 'Error in the database. Cannot find ' . $parsed_state->getId(), 404 );
            }

            $next_states_win_prob[ $arrow ] = $new_state->WinProb;
            $next_states_tie_prob[ $arrow ] = $new_state->TieProb;
            $max_win_prob = max( $max_win_prob, $new_state->WinProb );
            $max_tie_prob = max( $max_tie_prob, $new_state->TieProb );

            // echo "Considered move " . $arrow . ", state: " . $new_state->toStringProbs() . "<br/><br/>";
        }

        // If no win or tie probability, all fallback to random
        if( $max_win_prob == 0 && $max_tie_prob == 0 )
            $type = 'random';

        // If no win probability, medium fallback to easy
        if( $max_win_prob == 0 && $type == 'medium' )
            $type = 'easy';

        // If no win probability, hard evolves in tie_hard
        if( $max_win_prob == 0 && $type == 'hard' )
            $type = 'tie_hard';

        // echo "Type: " . $type . "<br/>";

        foreach( $next_states_win_prob as $arrow => $foo ) {

            // Different behaviors
            // Random case: all have same prob
            if( $type == 'random' )
                $next_move[ $arrow ] = 1;
            
            // Easy case: prob proportional to win or tie
            if( $type == 'easy' )
                $next_move[ $arrow ] = $next_states_win_prob[ $arrow ] + $next_states_tie_prob[ $arrow ] / 10;

            // Hard case: prob proportional to win
            if( $type == 'medium' )
                $next_move[ $arrow ] = $next_states_win_prob[ $arrow ] ** 4;

            // Impossible case: only optimal values are accepted
            if( $type == 'hard' )
                $next_move[ $arrow ] = ( $next_states_win_prob[ $arrow ] == $max_win_prob ? 1 : 0 );

            // Impossible case when no win is possible: only optimal values are accepted
            if( $type == 'tie_hard' )
                $next_move[ $arrow ] = ( $next_states_tie_prob[ $arrow ] == $max_tie_prob ? 1 : 0 );
        }

        // Get total
        $total = array_sum( $next_move );

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