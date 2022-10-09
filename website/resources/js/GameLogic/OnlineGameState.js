import { RemotePlayer, RealPlayer, RedPlayer } from "./Enumerators";
import GameState from "./GameState";

export default class OnlineGameState extends GameState {
    myClientId;
    hisClientId;
    amIMaster;

    constructor( myRole, myClientId, hisClientId, amIMaster, setIdCallback ) {
        super( setIdCallback )
        this.myClientId = myClientId;
        this.hisClientId = hisClientId;
        this.amIMaster = amIMaster;

        if( myRole == RedPlayer ) {
            this.type_red = RealPlayer;
            this.type_blu = RemotePlayer;
        } else {
            this.type_red = RemotePlayer;
            this.type_blu = RealPlayer;
        }
    }

    getPlayerForSaving( type ) {
        if( type == RealPlayer ) return this.myClientId;
        else return this.hisClientId;
    }

    shouldISave() {
        return this.amIMaster;
    }
}