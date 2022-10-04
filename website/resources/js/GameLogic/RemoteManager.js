import Ably from 'ably'

export default class RemoteManager {
    ably;

    connect( token ) {
        this.ably = new Ably.Realtime( token );
    }
    
}