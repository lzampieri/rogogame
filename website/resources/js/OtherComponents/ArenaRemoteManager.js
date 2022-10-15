import Ably from 'ably'

export default class ArenaRemoteManager {
    ably;
    clientId;
    username;

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
    
    async connect( token, clientId, username ) {
        this.clientId = clientId
        this.username = username
        
        this.ably = new Ably.Realtime.Promise( {token: token, clientId: this.clientId } );
        await this.ably.connection.once('connected');
        
    }
    
    update_players_list( ) {
        this.arena_channel.presence.get((err, members) => {
            console.log( members );
            if( err ) this.error_on_channel( err )
            let ids = members.filter( m => m.clientId != this.clientId )
            this.updatePlayersCallback( ids )
        })
    }

    sendChallenge( challenged ) {
        this.arena_channel.publish( 'challenge:send', { from: this.clientId, fromUsername: this.username, to: challenged } )
    }
    getChallenged( data ) {
        if( data.to == this.clientId )
            this.challengedCallback( data );
    }
    
    sendChallengeAccepted( challenged ) {
        this.arena_channel.publish( 'challenge:accept', { from: this.clientId, fromUsername: this.username, to: challenged } )
    }
    getChallengeAccepted( data ) {
        if( data.to == this.clientId )
            this.challengeAcceptedCallback( data );
    }
    
    sendChallengeRejected( challenged ) {
        this.arena_channel.publish( 'challenge:reject', { from: this.clientId, fromUsername: this.username, to: challenged } )
    }
    getChallengeRejected( data ) {
        if( data.to == this.clientId )
            this.challengeRejectedCallback( data );
    }
    
    sendChallengeAborted( challenged ) {
        this.arena_channel.publish( 'challenge:abort', { from: this.clientId, fromUsername: this.username, to: challenged } )
    }
    getChallengeAborted( data ) {
        if( data.to == this.clientId )
            this.challengeAbortedCallback( data );
    }



    async connectToArena( token, clientId, username, challengedCallback, challengeAcceptedCallback, challengeRejectedCallback, challengeAbortedCallback, updatePlayersCallback ) {
        this.challengedCallback = challengedCallback;
        this.challengeAcceptedCallback = challengeAcceptedCallback;
        this.challengeRejectedCallback = challengeRejectedCallback;
        this.challengeAbortedCallback = challengeAbortedCallback;
        this.updatePlayersCallback = updatePlayersCallback;

        // Connect to arena channel
        await this.connect( token, clientId, username );
        this.arena_channel = this.ably.channels.get( this.arena_channel_name )
        await this.arena_channel.attach( this.error_on_channel )

        // Subscribe to challenge events
        this.arena_channel.subscribe( 'challenge:send', ( { data } ) => this.getChallenged( data ) )
        this.arena_channel.subscribe( 'challenge:accept', ( { data } ) => this.getChallengeAccepted( data ) )
        this.arena_channel.subscribe( 'challenge:reject', ( { data } ) => this.getChallengeRejected( data ) )
        this.arena_channel.subscribe( 'challenge:abort', ( { data } ) => this.getChallengeAborted( data ) )
        
        // Register presence
        await this.arena_channel.presence.enter( { username: username } )
        await this.arena_channel.presence.subscribe( () => this.update_players_list() );
        this.update_players_list()

    }
    
}