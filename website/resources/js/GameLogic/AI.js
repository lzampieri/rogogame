
export default class AI {
    ai_type;

    constructor( ai_type ) {
        this.ai_type = ai_type;
    }

    async get( current_gamestate, callback ) {
        if( this.running ) return;

        this.running = true;
        let api_url = route( 'api_move', {'type': this.ai_type, 'state': current_gamestate.hash()} )
        let response = await $.get( api_url );
        let move = parseInt( response );
        console.log( "AI performing " + move );
        this.running = false;

        callback( move );
    }

}