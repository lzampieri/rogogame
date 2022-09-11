import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import SideColumn from "../GameGraphycs/SideColumn";
import GameState from "../GameLogic/GameState";


export default class GameAI extends Component {
    constructor() {
        super();
        this.state = {
            gamestate: new GameState()
        }
    }

    addArrow( arr ) {
        if( this.state.gamestate.drawable( arr ) ) {
            this.setState( ( prevState ) => {
                prevState.gamestate.add( arr )
                return prevState.gamestate
            })
        }
    }

    render() {
        return (<>
            <div className="w-screen h-screen flex flex-row items-stretch">
                <SideColumn side={1} active={this.state.gamestate.nextPlayer() == 1} />
                
                <div className="grow flex flex-col items-center">
                    <div className="bg-info">Testo info 1</div>
                    <CentralCanvas gamestate={this.state.gamestate} addArrow={ (arr) => this.addArrow( arr ) } />
                    <div className="bg-info">Testo info 2</div>
                </div>
                
                <SideColumn side={2} active={this.state.gamestate.nextPlayer() == 2} />
            </div>
        </>)
    }

}