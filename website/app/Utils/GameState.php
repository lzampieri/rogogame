<?php

namespace App\Utils;

use App\Models\Move;

class GameState
{
    protected $arrows_red = array();
    protected $arrows_blu = array();
    protected const N = 8;

    public static function fromMove( Move $move ) {
        return self::fromID( $move->id );
    }

    public static function fromID( $id ) {
        $gs = new GameState();

        for( $i = 0; $i < GameState::N; $i++ ) {
            $a = intval( substr( $id, $i * 2, 2 ) );
            if( $a > 0 ) {
                if( $i < GameState::N / 2 ) $gs->arrows_red[] = $a;
                else $gs->arrows_blu[] = $a;
            }
        }
        return $gs;
    }

    public function arrFrom( $a ) {
        return $a % GameState::N;
    }
    public function arrTo( $a ) {
        return floor( $a / GameState::N );
    }

    public function toString() {
        $ss = "Arrows red: ";
        foreach( $this->arrows_red as $a ) {
            $ss .= $this->arrFrom( $a ) . '->' . $this->arrTo( $a ) . ' ';
        }
        $ss .= "\nArrows blu: ";
        foreach( $this->arrows_blu as $a ) {
            $ss .= $this->arrFrom( $a ) . '->' . $this->arrTo( $a ) . ' ';
        }
        return $ss;
    }

    public function add( $arrow ) {
        if( count( $this->arrows_blu ) < count( $this->arrows_red ) ) {
            $this->arrows_blu[] = $arrow;
        }
        else {
            $this->arrows_red[] = $arrow;
        }
    }

    public function getId() {
        sort( $this->arrows_red );
        sort( $this->arrows_blu );

        $id = "";
        for( $i = 0; $i < GameState::N / 2; $i++ ) {
            if( $i < count( $this->arrows_red ) ) {
                if( $this->arrows_red[ $i ] < 10 ) $id .= "0";
                $id .= $this->arrows_red[ $i ];
            } else {
                $id .= "00";
            }
        }
        for( $i = 0; $i < GameState::N / 2; $i++ ) {
            if( $i < count( $this->arrows_blu ) ) {
                if( $this->arrows_blu[ $i ] < 10 ) $id .= "0";
                $id .= $this->arrows_blu[ $i ];
            } else {
                $id .= "00";
            }
        }

        return $id;
    }

    public function getMove( ) {
        return Move::findOrFail( $this->getId() );
    }
};