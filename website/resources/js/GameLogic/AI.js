
export default class AI {

    async get( type, current_gamestate, callback ) {
        if( this.running ) return;

        this.running = true;
        let api_url = route( 'api_move', {'type': type, 'state': current_gamestate.hash()} )
        console.log( api_url );
        let response = await fetch( api_url );
        let move = parseInt( await response.text() );
        console.log( "Performing " + move );
        this.running = false;

        callback( move );
    }

}