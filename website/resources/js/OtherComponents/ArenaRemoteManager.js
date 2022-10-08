import Ably from 'ably'

export default class RemoteManager {
    ably;
    clientId;

    // Arena channel
    arena_channel;
    arena_channel_name = 'arena';

    // Arena challenging callbacks
    updatePlayersCallback;
    challengedCallback;
    challengeAcceptedCallback;
    challengeRejectedCallback;
    challengeAbortedCallback;

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
    
    update_players_list( ) {
        this.arena_channel.presence.get((err, members) => {
            if( err ) this.error_on_channel( err )
            let ids = members.map( m => m.clientId ).filter( m => m != this.clientId )
            this.updatePlayersCallback( ids )
        })
    }

    sendChallenge( challenged ) {
        this.arena_channel.publish( 'challenge:send', { from: this.clientId, to: challenged } )
    }
    getChallenged( data ) {
        if( data.to == this.clientId )
            this.challengedCallback( data );
    }
    
    sendChallengeAccepted( challenged ) {
        this.arena_channel.publish( 'challenge:accept', { from: this.clientId, to: challenged } )
    }
    getChallengeAccepted( data ) {
        if( data.to == this.clientId )
            this.challengeAcceptedCallback( data );
    }
    
    sendChallengeRejected( challenged ) {
        this.arena_channel.publish( 'challenge:reject', { from: this.clientId, to: challenged } )
    }
    getChallengeRejected( data ) {
        if( data.to == this.clientId )
            this.challengeRejectedCallback( data );
    }
    
    sendChallengeAborted( challenged ) {
        this.arena_channel.publish( 'challenge:abort', { from: this.clientId, to: challenged } )
    }
    getChallengeAborted( data ) {
        if( data.to == this.clientId )
            this.challengeAbortedCallback( data );
    }



    async connectToArena( token, clientId, challengedCallback, challengeAcceptedCallback, challengeRejectedCallback, challengeAbortedCallback, updatePlayersCallback ) {
        this.challengedCallback = challengedCallback;
        this.challengeAcceptedCallback = challengeAcceptedCallback;
        this.challengeRejectedCallback = challengeRejectedCallback;
        this.challengeAbortedCallback = challengeAbortedCallback;
        this.updatePlayersCallback = updatePlayersCallback;

        // Connect to arena channel
        await this.connect( token, clientId );
        this.arena_channel = this.ably.channels.get( this.arena_channel_name )
        await this.arena_channel.attach( this.error_on_channel )

        // Subscribe to challenge events
        this.arena_channel.subscribe( 'challenge:send', ( { data } ) => this.getChallenged( data ) )
        this.arena_channel.subscribe( 'challenge:accept', ( { data } ) => this.getChallengeAccepted( data ) )
        this.arena_channel.subscribe( 'challenge:reject', ( { data } ) => this.getChallengeRejected( data ) )
        this.arena_channel.subscribe( 'challenge:abort', ( { data } ) => this.getChallengeAborted( data ) )
        
        // Register presence
        await this.arena_channel.presence.enter( )
        await this.arena_channel.presence.subscribe( () => this.update_players_list() );
        this.update_players_list()

    }
    
}