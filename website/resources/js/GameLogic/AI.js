
export default class AI {

    async get( type, current_gamestate, callback ) {
        if( this.running ) return;

        this.running = true;
        let api_url = route( 'api_move', {'type': type, 'state': current_gamestate.hash()} )
        let response = await fetch( api_url );
        let move = parseInt( await response.text() );
        console.log( "AI performing " + move );
        this.running = false;

        callback( move );
    }

}