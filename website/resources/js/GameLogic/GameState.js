import { AIPlayer, BluPlayer, None, RealPlayer, RedPlayer } from "./Enumerators";

export default class GameState {
    arrows_red;
    arrows_blu;
    type_red;
    type_blu;

    constructor( how_many_real ) {
        this.resetGame( how_many_real );
    }

    resetGame( how_many_real ) {
        this.arrows_red = []
        this.arrows_blu = []

        if( how_many_real == 1 ) {
            this.type_red = ( Math.random() < 0.5 ? RealPlayer : AIPlayer );
            this.type_blu = - this.type_red;
        }
        else if( how_many_real == 0 ) {
            this.type_red = AIPlayer;
            this.type_blu = AIPlayer;
        } else {
            this.type_red = RealPlayer;
            this.type_blu = RealPlayer;
        }
    }

    nextPlayer() {
        if( this.ended() ) return None;
        if( this.arrows_blu.length < this.arrows_red.length )
            return BluPlayer;
        else
            return RedPlayer;
    }

    nextPlayerType() {
        if( this.ended() ) return None;
        if( this.nextPlayer() == RedPlayer ) return this.type_red;
        else return this.type_blu;
    }

    add( arr ) {
        if( this.arrows_blu.length < this.arrows_red.length )
            this.arrows_blu.push( arr )
        else
            this.arrows_red.push( arr )
    }

    ended() {
        if( this.arrows_blu.length + this.arrows_red.length == 8 ) return true;
        return false;
    }

    drawable( arr ) {
        console.log( "Checking %d", arr )

        const from = GameState.arr_from( arr );
        const to = GameState.arr_to( arr );
        if( ( to > 8 ) || ( from == to ) )
            return false

        // Create a full arrows list
        const all_arrows = this.arrows_red.concat( this.arrows_blu )

        // Check the arc is not already drawned
        // and that the departure and arrival vertices are available
        if( ! all_arrows.every( a => {
            if( arr == a ) return false
            if( from == GameState.arr_from( a ) ) return false
            if( to == GameState.arr_to( a ) ) return false
            return true
        } ) ) return false

        console.log( "Ok %d", arr )
        
        // Check that there are no cycles
        let count = 0
        let next = to
        for( let i = 0; i < all_arrows.length; i++ ) {
            if( next == GameState.arr_from( all_arrows[i] ) ) {
                next = GameState.arr_to( all_arrows[i] );
                count += 1;
                i = -1;
                if( next == from ) {
                    if( count < 8 - 1 )
                        return false;
                }
            }
        }
    
        return true;
    }

    hash() {
        let hash = "";
        this.arrows_red.sort((a,b)=>a-b);
        this.arrows_blu.sort((a,b)=>a-b);

        console.log( this.arrows_red )
        console.log( this.arrows_blu )

        for( let i = 0; i < 8/2; i++ ) {
            if( i < this.arrows_red.length ) {
                if( this.arrows_red[i] < 10 ) hash += "0";
                hash += this.arrows_red[i];
            } else  {
                hash += "00";
            }
        }
        for( let i = 0; i < 8/2; i++ ) {
            if( i < this.arrows_blu.length ) {
                if( this.arrows_blu[i] < 10 ) hash += "0";
                hash += this.arrows_blu[i];
            } else  {
                hash += "00";
            }
        }
        return hash;
    }

    static arr_from( a ) { return a % 8 }
    static arr_to  ( a ) { return Math.floor( a / 8 ) }
    static arr ( from, to ) { return from + to * 8 }
}