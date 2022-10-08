import Ably from 'ably'

export default class RemoteManager {
    ably;
    clientId;

    // Game channel
    game_channel;
    game_channel_name = 'game';

    // Evolution
    ready = false;

    error_on_channel( mess ) {
        if( mess ) {
            console.log( 'Error on channel!')
            console.log( mess )
        }
    }
    
    async connect( token, clientId ) {
        this.clientId = clientId
        
        this.ably = new Ably.Realtime.Promise( {token: token, clientId: this.clientId} );
        await this.ably.connection.once('connected');
        
    }

    async getGameReady( data ) {
        // if( !this.ready ) {
        //     if( data.from == this.against && data.to == this.clientId ) {
        //         this.arena_channel.publish( 'game:')
        //     }
        // }
    }

    async connectToGame( token, clientId, against ) {
        // this.against = against;

        // // Connect to game channel
        // await this.connect( token, clientId );
        // this.game_channel = this.ably.channels.get( this.game_channel_name )
        // await this.game_channel.attach( this.error_on_channel )

        // // Subscribe to game events
        // this.arena_channel.subscribe( 'game:ready', ( { data } ) => this.getGameReady( data ) )

        // // Send ready message
        // this.arena_channel.publish( 'game:ready', { from: clientId, to: against } )

    }
    
}