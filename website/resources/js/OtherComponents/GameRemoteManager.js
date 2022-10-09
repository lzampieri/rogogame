import Ably from 'ably'
import { BluPlayer, RedPlayer } from '../GameLogic/Enumerators';

export default class GameRemoteManager {
    ably;
    clientId;

    // Game channel
    game_channel;
    game_channel_name = 'game';
    role;

    // Callbacks
    gameReadyCallback;

    // Evolution
    state = 'waiting_for_opponent'
    //      'waiting_for_rules'
    //      'game_ready'
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

    async check_if_ready( ) {
        if( this.role != 'master' ) return;
        if( this.state == 'waiting_for_opponent' ) {
            this.game_channel.presence.get( (err, members) => {
                console.log( members )
                let member = members.filter( m => m.clientId == this.against )
                console.log( member )
                if( member.length > 0 && this.state == 'waiting_for_opponent' ) {
                    this.state = 'waiting_for_rules';
                    console.log( 'Rules sended' );
                    this.game_channel.publish( 'game:rules', { from: this.clientId, to: this.against, redPlayer: Math.random() < 0.5 ? 'master' : 'slave' } )
                    return
                }
            })
    
        }
    }

    async receive_rules( data ) {
        if( data.from == this.against && data.to == this.clientId && this.state == 'waiting_for_rules' ) {
            this.state = 'game_ready'
            this.gameReadyCallback( data.redPlayer == this.role ? RedPlayer : BluPlayer,  )
            if( this.role == 'slave' ) {
                this.game_channel.publish( 'game:rules', { from: this.clientId, to: this.against, redPlayer: data.redPlayer } )
            }
        }
    }

    async send_move( move ) {
        this.game_channel.publish( 'game:move', { from: this.clientId, to: this.against, move: move } )
    }
    async receive_move( data ) {
        if( data.from == this.against && data.to == this.clientId ) {
            this.receiveMoveCallback( data.move )
        }
    }

    async publishId( id ) {
        if( this.role == 'master' ) {
            this.game_channel.publish( 'game:id', { from: this.clientId, to: this.against, id: id } )
        }
    }
    async reveiveId( data ) {
        if( data.from == this.against && data.to == this.clientId ) {
            this.receiveIdCallback( data.id )
        }
    }

    async connectToGame( role, token, clientId, against, gameReadyCallback, receiveMoveCallback, receiveIdCallback ) {
        this.against = against;
        this.role = role;
        this.gameReadyCallback = gameReadyCallback;
        this.receiveMoveCallback = receiveMoveCallback;
        this.receiveIdCallback = receiveIdCallback;

        // Connect to game channel
        await this.connect( token, clientId );
        this.game_channel = this.ably.channels.get( this.game_channel_name )
        await this.game_channel.attach( this.error_on_channel )

        // Subscribe to game events
        this.game_channel.subscribe( 'game:rules', ( { data } ) => this.receive_rules( data ) )
        this.game_channel.subscribe( 'game:move', ( { data } ) => this.receive_move( data ) )
        this.game_channel.subscribe( 'game:id', ( { data } ) => this.reveiveId( data ) )

        // Subscribe to presence events
        await this.game_channel.presence.enter()
        if( role == 'master' ) {
            await this.game_channel.presence.subscribe( () => this.check_if_ready() )
            this.check_if_ready()
        } else {
            this.state = 'waiting_for_rules'
        }

        // // Send ready message
        // this.arena_channel.publish( 'game:ready', { from: clientId, to: against } )

    }
    
}