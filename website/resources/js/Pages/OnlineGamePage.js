import { Component } from "react"
import CentralCanvas from "../GameGraphycs/CentralCanvas";
import EndedBanner from "../GameGraphycs/EndedBanner";
import SideColumn from "../GameGraphycs/SideColumn";
import { BluPlayer, RealPlayer, RedPlayer } from "../GameLogic/Enumerators";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';
import OnlineGameState from "../GameLogic/OnlineGameState";
import GameRemoteManager from "../OtherComponents/GameRemoteManager";
import Modal from "../OtherComponents/Modal";

export default class onlineGamePage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            gamestate: null,
            saved_id: null
        }
    }

    addArrow( arr ) {
        closeSnackbar();
        if( this.state.gamestate.drawable( arr ) ) {
            let newState = this.state.gamestate;
            newState.add( arr );
            this.gameRemoteManager.send_move( arr );
            this.setState( { gamestate: newState } );
        } else {
            enqueueSnackbar( 'Mossa non permessa.', { variant: 'warning' } );
        }
    }

    resetGame( ) {
        // let newState = this.state.gamestate;
        // newState.resetGame( );
        // this.setState( { gamestate: newState } );
    }

    componentDidMount( ) {
        this.gameRemoteManager = new GameRemoteManager( );
        this.gameRemoteManager.connectToGame(
            this.props.role,
            this.props.ably.token, this.props.ably.clientId,
            this.props.against,
            ( role ) => this.gameReady( role ),
            ( arr ) => this.receiveMove( arr ),
            ( id ) => this.setId( id )
            );
    }

    gameReady( role ) {
        this.setState( {
            gamestate: new OnlineGameState(
                role,
                this.gameRemoteManager.clientId, this.gameRemoteManager.against,
                this.props.role == 'master',
                ( new_id ) => this.setId( new_id )
                )
        });
    }

    setId( new_id ) {
        this.setState( { saved_id: new_id } );
        this.gameRemoteManager.publishId( new_id );
    }

    receiveMove( arr ) {
        let newState = this.state.gamestate;
        newState.add( arr );
        this.setState( { gamestate: newState } );
    }

    render() {
        return (<>
            <Modal visible={ this.state.gamestate == null }>
                In attesa dell'avversario...
            </Modal>
            { this.state.gamestate != null && 
                <>
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
                    gameState={this.state.gamestate}
                    />
                </>
            }
        </>)
    }

}