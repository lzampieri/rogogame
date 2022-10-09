import { AIPlayer, RealPlayer } from "./Enumerators";
import GameState from "./GameState";

export default class OfflineGameState extends GameState {
    ai_type;
    how_many_real;

    constructor( how_many_real, ai_type, setIdCallback ) {
        super( setIdCallback )
        this.ai_type = ai_type;

        if( how_many_real == 1 ) {
            this.type_red = ( Math.random() < 0.5 ? RealPlayer : AIPlayer );
            this.type_blu = - this.type_red;
        }
        else if( how_many_real == 0 ) {
            this.type_red = AIPlayer;
            this.type_blu = AIPlayer;
        } else {
            this.type_red = RealPlayer;
            this.type_blu = RealPlayer;
        }
    }

    getPlayerForSaving( type ) {
        if( type == AIPlayer ) return this.ai_type;
        else return 'real';
    }

    shouldISave() {
        return true;
    }
}