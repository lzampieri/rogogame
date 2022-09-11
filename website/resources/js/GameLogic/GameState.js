

export default class GameState {
    arrows_red;
    arrows_blu;

    constructor() {
        this.arrows_red = [ ]
        this.arrows_blu = [ ]
    }

    nextPlayer() {
        if( this.arrows_blu.length < this.arrows_red.length )
            return 2
        else
            return 1
    }

    add( arr ) {
        if( this.arrows_blu.length < this.arrows_red.length )
            this.arrows_blu.push( arr )
        else
            this.arrows_red.push( arr )

        console.log( "Added %d", arr )
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

    static arr_from( a ) { return a % 8 }
    static arr_to  ( a ) { return Math.floor( a / 8 ) }
    static arr ( from, to ) { return from + to * 8 }
}