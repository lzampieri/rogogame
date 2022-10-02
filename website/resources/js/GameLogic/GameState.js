import { AIPlayer, BluPlayer, None, RealPlayer, RedPlayer } from "./Enumerators";

export default class GameState {
    arrows_red;
    arrows_blu;
    type_red;
    type_blu;

    ai_type;
    how_many_real;

    cached_results;

    setIdCallback;

    constructor( how_many_real, ai_type, setIdCallback ) {
        this.ai_type = ai_type;
        this.setIdCallback = null;
        this.how_many_real = how_many_real;
        this.resetGame( );
        this.setIdCallback = setIdCallback;
    }

    resetGame( ) {
        this.arrows_red = []
        this.arrows_blu = []

        if( this.how_many_real == 1 ) {
            this.type_red = ( Math.random() < 0.5 ? RealPlayer : AIPlayer );
            this.type_blu = - this.type_red;
        }
        else if( this.how_many_real == 0 ) {
            this.type_red = AIPlayer;
            this.type_blu = AIPlayer;
        } else {
            this.type_red = RealPlayer;
            this.type_blu = RealPlayer;
        }

        this.cached_results = null;

        if( this.setIdCallback )
            this.setIdCallback( null );
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
        console.log( "Performing %d", arr )
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
                
        // Check that there are no cycles
        let count = 0
        let next = to
        for( let i = 0; i < all_arrows.length; i++ ) {
            if( next == GameState.arr_from( all_arrows[i] ) ) {
                next = GameState.arr_to( all_arrows[i] );
                count = count + 1;
                i = -1;
                if( next == from ) {
                    console.log("Il ciclo risulta di: " + count)
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

    static parseHash( theHash ) {
        let gs = new GameState();
        gs.arrows_red = [];
        gs.arrows_blu = [];
        
        for( let i = 0; i < 8/2; i++ ) {
            let a = parseInt( theHash.substring( 2 * i, 2 * i + 2 ) );
            if( a > 0 )
                gs.arrows_red.push( a );
        }
        for( let i = 0; i < 8/2; i++ ) {
            let a = parseInt( theHash.substring( 2 * i + 8, 2 * i + 10 ) );
            if( a > 0 )
                gs.arrows_blu.push( a );
        }
        return gs
    }


    results( force = false ) {
        if( !this.ended() && !force ) return null;
        if( this.cached_results ) return this.cached_results; // If results are already computed, send them back
        
        let points_red = 0;
        let points_blu = 0;

        let double_arrows_red = [];
        let double_arrows_blu = [];

        let all_arrows = this.arrows_red.concat( this.arrows_blu )
        
        // Check for double arrows in the same direction
        for( let i = 0; i < all_arrows.length; i++ ) {
            let from = GameState.arr_from ( all_arrows[i] );
            let to   = GameState.arr_to  ( all_arrows[i] );

            for( let j = 0; j < all_arrows.length; j++ ) {
                if( j == i )
                    continue;
                if( GameState.arr_from( all_arrows[j] ) == to ) {
                    if( ( from < to ) && ( to < GameState.arr_to( all_arrows[j] ) ) ) {
                        points_red += 1;
                        double_arrows_red.push( to );
                    }
                    if( ( from > to ) && ( to > GameState.arr_to( all_arrows[j] ) ) ) {
                        points_blu += 1;
                        double_arrows_blu.push( to );
                    }
                    break;
                }
            }
        }

        // Check for double occupied spaces
        // Red player
        let occupied_up = new Array( 8 - 1 );
        let occupied_dw = new Array( 8 - 1 );
        for (let i=0; i < 8 - 1; i++ ) occupied_up[i] = 0;
        for (let i=0; i < 8 - 1; i++ ) occupied_dw[i] = 0;
        
        let double_crossing_red = new Array( 8 - 1 );
        for (let i=0; i < 8 - 1; i++ ) double_crossing_red[i] = 0;

        for( let i = 0; i < this.arrows_red.length; i++ ) {
            let from = GameState.arr_from( this.arrows_red[ i ] );
            let to   = GameState.arr_to  ( this.arrows_red[ i ] );
            let dir  = 1;

            if( from > to ) {
                [ from, to ] = [ to, from ];
                dir *= -1;
            }

            for( let j = from; j < to; j++ ) {
                if( dir > 0 )
                    occupied_up[ j ] += 1;
                else 
                    occupied_dw[ j ] += 1;
            }
        }
        for( let i = 0; i < 8 - 1; i ++ ) {
            double_crossing_red[ i ] = Math.min( occupied_up[ i ], occupied_dw[ i ] );
            points_red += double_crossing_red[ i ];
        }

        // Blu player
        for (let i=0; i < 8 - 1; i++ ) occupied_up[i] = 0;
        for (let i=0; i < 8 - 1; i++ ) occupied_dw[i] = 0;
        
        let double_crossing_blu = new Array( 8 - 1 );
        for (let i=0; i < 8 - 1; i++ ) double_crossing_blu[i] = 0;

        for( let i = 0; i < this.arrows_blu.length; i++ ) {
            let from = GameState.arr_from( this.arrows_blu[ i ] );
            let to   = GameState.arr_to  ( this.arrows_blu[ i ] );
            let dir  = 1;

            if( from > to ) {
                [ from, to ] = [ to, from ];
                dir *= -1;
            }

            for( let j = from; j < to; j++ ) {
                if( dir > 0 )
                    occupied_up[ j ] += 1;
                else 
                    occupied_dw[ j ] += 1;
            }
        }
        for( let i = 0; i < 8 - 1; i ++ ) {
            double_crossing_blu[ i ] = Math.min( occupied_up[ i ], occupied_dw[ i ] );
            points_blu += double_crossing_blu[ i ];
        }

        let winner = None;

        if( points_red > points_blu )
            winner = RedPlayer;
        if( points_blu > points_red )
            winner = BluPlayer;

        this.cached_results = {
            points_red: points_red,
            points_blu: points_blu,
            double_arrows_red: double_arrows_red,
            double_arrows_blu: double_arrows_blu,
            double_crossing_red: double_crossing_red,
            double_crossing_blu: double_crossing_blu,
            winner: winner
        }

        if( !force )
            this.save_match( this.cached_results );

        return this.cached_results;
    }

    async save_match( results ) {
        let res = await $.post( route( 'api_game_register' ), {
            redtype: ( this.type_red == RealPlayer ? 'real' : this.ai_type ),
            blutype: ( this.type_blu == RealPlayer ? 'real' : this.ai_type ),
            redpoints: results.points_red,
            blupoints: results.points_blu,
            final_state: this.hash()
        } );

        if( res && res.id ) {
            this.setIdCallback( res.id );
        }
    }

    static arr_from( a ) { return a % 8 }
    static arr_to  ( a ) { return Math.floor( a / 8 ) }
    static arr ( from, to ) { return from + to * 8 }
}