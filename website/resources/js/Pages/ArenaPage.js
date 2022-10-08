import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeSnackbar, enqueueSnackbar, SnackbarProvider } from "notistack";
import { Component, useEffect, useState } from "react";
import RemoteManager from "../OtherComponents/ArenaRemoteManager";
import Modal from "../OtherComponents/Modal";

export default class onlineGamePage extends Component {

    constructor() {
        super()
        this.state = {
            presents: [],
            isChallenging: false,
            isUnderChallenge: false,
            challengedBy: '',
            challengedByName: '',
        }
    }

    componentDidMount( ) {
        this.remoteManager = new RemoteManager( );
        this.remoteManager.connectToArena(
            this.props.ably.token, this.props.ably.clientId,
            ( data ) => this.challenged( data ),
            ( data ) => this.challengeAccepted( data ),
            ( data ) => this.challengeRejected( data ),
            ( data ) => this.challengeAborted( data ),
            ( presents ) => this.setState( { presents: presents } ) );
    }

    challenge( id ) {
        closeSnackbar();
        if( this.state.isUnderChallenge || this.state.isChallenging ) return;
        this.setState( { isChallenging: true } )
        this.remoteManager.sendChallenge( id )
    }

    challenged( data ) {
        closeSnackbar();
        if( this.state.isUnderChallenge || this.state.isChallenging ) {
            this.remoteManager.sendChallengeAborted( data.from )
        }
        else {
            this.setState( { isUnderChallenge: true, challengedBy: data.from, challengedByName: 'Anonimo' } )
        }
    }

    acceptChallenge() {
        this.remoteManager.sendChallengeAccepted( this.state.challengedBy )
        window.location.href = route( 'game.multiplayer', { against: this.state.challengedBy } )
    }
    challengeAccepted( data ) {
        window.location.href = route( 'game.multiplayer', { against: data.from } )
    }

    rejectChallenge() {
        this.setState( { isUnderChallenge: false } )
        this.remoteManager.sendChallengeRejected( this.state.challengedBy )
    }
    challengeRejected( data ) {
        if( data.from == this.state.challenged ) {
            this.setState( { isChallenging: false } )
            enqueueSnackbar( 'Sfida rifiutata.', { variant: 'warning' } );
        }
    }
    
    challengeAborted( data ) {
        if( data.from == this.state.challenged ) {
            this.setState( { isChallenging: false } )
            enqueueSnackbar( 'Sfida annullata: l\'avversario è impegnato.', { variant: 'warning' } );
        }
    }

    render( ) {
        return ( <>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
            <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
                <span className="text-5xl md:text-7xl">Arena</span>
                <div className="flex flex-row flex-wrap justify-center gap-4 w-1/3 mt-8">
                    { this.state.presents.map( ( id ) =>
                        <div
                            href={id}
                            key={id}
                            onClick={ () => this.challenge( id ) }
                            className="
                                aspect-square shadow-2xl border-2 border-text 
                                bg-text text-background hover:bg-background hover:text-text 
                                w-1/5 
                                flex flex-col items-center justify-center gap-2
                                cursor-pointer">
                            <FontAwesomeIcon icon={ faBrain } className="text-2xl"/>
                            <span>Anonimo</span>
                        </div>
                    ) }
                    { this.state.presents.length == 0 && <span key={0}>In attesa di partecipanti...</span> }
                </div>
            </div>
            <Modal visible={ this.state.isChallenging }>
                In attesa dello sfidante...
            </Modal>
            <Modal visible={ this.state.isUnderChallenge }>
                Sei stato sfidato da { this.state.challengedByName }
                <div>
                    <a onClick={() => this.acceptChallenge() } className="underline cursor-pointer">Accetta</a>
                    &nbsp;&nbsp;
                    <a onClick={() => this.rejectChallenge() } className="underline cursor-pointer">Rifiuta</a>
                </div>
            </Modal>
        </> )
    }
}