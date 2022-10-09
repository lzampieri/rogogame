import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import EndedBanner from "../GameGraphycs/EndedBanner";
import SideColumn from "../GameGraphycs/SideColumn";
import AI from "../GameLogic/AI";
import OfflineGameState from "../GameLogic/OfflineGameState";
import { AIPlayer, BluPlayer, RealPlayer, RedPlayer } from "../GameLogic/Enumerators";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';

export default class GamePage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            gamestate: new OfflineGameState( parseInt( props.pl ), props.type, ( new_id ) => this.setState( { saved_id: new_id } ) ),
            saved_id: null
        }
        this.AI = new AI( props.type );
    }

    addArrow( arr ) {
        closeSnackbar();
        if( this.state.gamestate.drawable( arr ) ) {
            let newState = this.state.gamestate;
            newState.add( arr );

            this.setState( { gamestate: newState } );
        } else {
            enqueueSnackbar( 'Mossa non permessa.', { variant: 'warning' } );
        }
    }

    resetGame( ) {
        this.setState( { gamestate: new OfflineGameState( this.state.gamestate.how_many_real, this.state.gamestate.ai_type, this.state.gamestate.setIdCallback ) } );
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
            <div className="w-screen h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
                <SideColumn
                    side={RedPlayer}
                    gamestate={this.state.gamestate}
                    />
                
                <div className="grow flex flex-col items-center">
                    <CentralCanvas
                        gamestate={this.state.gamestate}
                        addArrow={ (arr) => this.addArrow( arr ) }
                        drawingActive={this.state.gamestate.nextPlayerType() == RealPlayer}
                    />
                    <div className="bg-info rounded-full  m-1 px-2 text-sm">
                        <span className="text-info_contrast">#{this.state.gamestate.hash()}</span>
                        { this.state.saved_id && <>
                            &nbsp;-&nbsp;<span className="text-player1-parque">#{this.state.saved_id}</span>
                        </>}
                    </div>
                </div>
                
                <SideColumn
                    side={BluPlayer}
                    gamestate={this.state.gamestate}
                    />
            </div>
            <EndedBanner
                gameState={this.state.gamestate} resetCallback={() => this.resetGame()}
            />
        </>)
    }

}