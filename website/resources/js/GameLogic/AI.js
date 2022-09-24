
export default class AI {

    async get( type, current_gamestate ) {
        let api_url = route( 'api_move', {'type': type, 'state': current_gamestate.hash()} )
        console.log( api_url );
    }

}