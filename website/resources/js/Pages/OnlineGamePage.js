import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import EndedBanner from "../GameGraphycs/EndedBanner";
import SideColumn from "../GameGraphycs/SideColumn";
import AI from "../GameLogic/AI";
import { AIPlayer, BluPlayer, RealPlayer, RedPlayer } from "../GameLogic/Enumerators";
import GameState from "../GameLogic/GameState";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';

export default class onlineGamePage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            gamestate: null,
            saved_id: null
        }
    }

    addArrow( arr ) {
        // closeSnackbar();
        // if( this.state.gamestate.drawable( arr ) ) {
        //     let newState = this.state.gamestate;
        //     newState.add( arr );

        //     this.setState( { gamestate: newState } );
        // } else {
        //     enqueueSnackbar( 'Mossa non permessa.', { variant: 'warning' } );
        // }
    }

    resetGame( ) {
        // let newState = this.state.gamestate;
        // newState.resetGame( );
        // this.setState( { gamestate: newState } );
    }

    checkForAI( state ) {
        // if( this.state.gamestate.ended() ) return;
        // if( this.state.gamestate.nextPlayerType() == AIPlayer ) {
        //     this.AI.get( state, ( arr ) => this.addArrow( arr ) );     
        // }
    }


    componentDidMount( ) {
        this.remoteManager = new RemoteManager( );
        this.remoteManager.connectToGame(
            this.props.ably.token, this.props.ably.clientId,
            this.props.against );
    }

    componentDidUpdate() {
        this.checkForAI( this.state.gamestate )
    }

    render() {
        return (<>
            <div className="w-screen h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
                <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
                <SideColumn side={1} active={this.state.gamestate.nextPlayer() == RedPlayer} ai={this.state.gamestate.type_red == AIPlayer} winner={this.state.gamestate.ended() && this.state.gamestate.results().winner == RedPlayer} />
                
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
                
                <SideColumn side={2} active={this.state.gamestate.nextPlayer() == BluPlayer} ai={this.state.gamestate.type_blu == AIPlayer} winner={this.state.gamestate.ended() && this.state.gamestate.results().winner == BluPlayer} />
            </div>
            <EndedBanner
                gameState={this.state.gamestate} resetCallback={() => this.resetGame()}
            />
        </>)
    }

}