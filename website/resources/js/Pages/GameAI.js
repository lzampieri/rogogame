import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import EndedBanner from "../GameGraphycs/EndedBanner";
import SideColumn from "../GameGraphycs/SideColumn";
import AI from "../GameLogic/AI";
import { AIPlayer, BluPlayer, RealPlayer, RedPlayer } from "../GameLogic/Enumerators";
import GameState from "../GameLogic/GameState";


export default class GameAI extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            gamestate: new GameState( 0, props.type )
        }
        this.AI = new AI( props.type );
    }

    addArrow( arr ) {
        if( this.state.gamestate.drawable( arr ) ) {
            let newState = this.state.gamestate;
            newState.add( arr );

            this.setState( { gamestate: newState } );
        }
    }

    resetGame( ) {
        let newState = this.state.gamestate;
        newState.resetGame( 0 );
        this.setState( { gamestate: newState } );
    }

    checkForAI( state ) {
        if( this.state.gamestate.ended() ) return;
        if( this.state.gamestate.nextPlayerType() == AIPlayer ) {
            this.AI.get( state, ( arr ) => this.addArrow( arr ) );     
        }
    }

    componentDidMount() {
        this.checkForAI( this.state.gamestate )
    }

    componentDidUpdate() {
        this.checkForAI( this.state.gamestate )
    }

    render() {
        return (<>
            <div className="w-screen h-screen flex flex-row items-stretch">
                <SideColumn side={1} active={this.state.gamestate.nextPlayer() == RedPlayer} ai={this.state.gamestate.type_red == AIPlayer} winner={this.state.gamestate.ended() && this.state.gamestate.results().winner == RedPlayer} />
                
                <div className="grow flex flex-col items-center">
                    <CentralCanvas
                        gamestate={this.state.gamestate}
                        addArrow={ (arr) => this.addArrow( arr ) }
                        drawingActive={this.state.gamestate.nextPlayerType() == RealPlayer}
                    />
                    <div className="bg-info rounded-full text-info_contrast m-1 px-2 text-sm">
                        #{this.state.gamestate.hash()}
                    </div>
                </div>
                
                <SideColumn side={2} active={this.state.gamestate.nextPlayer() == BluPlayer} ai={this.state.gamestate.type_blu == AIPlayer} winner={this.state.gamestate.ended() && this.state.gamestate.results().winner == BluPlayer} />
            </div>
            <EndedBanner
                gameState={this.state.gamestate} resetCallback={() => this.resetGame()}
                
            />
        </>)
    }

}