import { usePage } from "@inertiajs/inertia-react";
import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import SideColumn from "../GameGraphycs/SideColumn";
import AI from "../GameLogic/AI";
import GameState from "../GameLogic/GameState";


export default class GameAI extends Component {
    constructor() {
        super();
        this.state = {
            gamestate: new GameState()
        }
        this.AI = new AI( );
    }

    addArrow( arr ) {
        if( this.state.gamestate.drawable( arr ) ) {
            let newState = this.state.gamestate;
            newState.add( arr );

            this.setState( { gamestate: newState } );

            this.AI.get( this.props.type, newState );
        }
    }

    render() {
        return (<>
            <div className="w-screen h-screen flex flex-row items-stretch">
                <SideColumn side={1} active={this.state.gamestate.nextPlayer() == 1} />
                
                <div className="grow flex flex-col items-center">
                    <div className="bg-info">Testo info 1</div>
                    <CentralCanvas
                        gamestate={this.state.gamestate}
                        addArrow={ (arr) => this.addArrow( arr ) }
                        drawingActive={this.state.gamestate.nextPlayer() == 1}
                    />
                    <div className="bg-info">Testo info 2</div>
                </div>
                
                <SideColumn side={2} active={this.state.gamestate.nextPlayer() == 2} ai/>
            </div>
        </>)
    }

}