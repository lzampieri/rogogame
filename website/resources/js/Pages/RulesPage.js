import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";
import linspace from "linspace";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Stage } from "react-konva";
import { Scrollama, Step } from "react-scrollama";
import StateOfGame from "../GameGraphycs/StateOfGame";
import GameState from "../GameLogic/GameState";
import { useBreakpoint } from "../useBreakpoints";

export default function rulesPage( props ) {
    const [ opacity, setOpacity ] = useState( 1 )
    const [ step, setStep ] = useState( { hash: '0000000000000000' } )

    const update = ( { data, progress } ) => {
        setStep( data );
        setOpacity( 4 * progress * ( 1 - progress ) );
    }

    const [ L, setL ] = useState( 100 )
    const [ H, setH ] = useState( 100 )
    const isMd = useBreakpoint( 'md' )
    const ref = useRef(null)

    const mid_x = L/2
    let ys = []
    if( isMd )
        // Use 60% for md
        ys = linspace( 0.2 * H, 0.8 * H, 8 )
    else
        // Use 80% for small screens
        ys = linspace( 0.1 * H, 0.9 * H, 8 )

    useEffect( () => {
        function resizeDetected() {
            setL( ref.current.offsetWidth )
            setH( ref.current.offsetHeight )
        }
        window.addEventListener( 'resize', resizeDetected )
        resizeDetected()
        return () => window.removeEventListener( 'resize', resizeDetected )
    } )


    return (<>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <span className="text-7xl md:text-9xl">strali</span>
            <span className="text-xl">regole</span>
            <FontAwesomeIcon icon={ faChevronDown } className="text-xl" />
        </div>
        <div className="w-full md:flex md:flex-row-reverse p-4">
            <div className="h-screen grow sticky top-0 right-0 -z-50" style={{ 'opacity': opacity }} ref={ref}>
                <Stage
                    width={L} height={H}>
                    <StateOfGame mid_x={ mid_x } ys={ ys } gamestate={ GameState.parseHash( step.hash ) } {...step} />
                </Stage>
            </div>

            <div className="w-full md:w-1/3">
            <Scrollama offset={0.5} onStepProgress={ update }>
                <Step data={ { hash: '0000000000000000' } } key={ 0 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Strali coinvolge 8 punti, e 2 giocatori.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0200000051000000' } } key={ 1 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Ogni giocatore, a turno, può collegare con una freccia due punti.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0220000051000000', arrows_extra: [ 44, 55 ] } } key={ 2 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Ogni punto può avere al più una freccia entrante e una freccia uscente.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0220000051000000', arrows_extra: [ 32 ] } } key={ 3 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Non possono essere tracciate frecce che creano cicli chiusi...
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0220624751082537', forceNoResults: true } } key={ 5 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            ...ad eccezione dell'ultima freccia, che termina il gioco.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0000000000000000' } } key={ 6 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Il punteggio finale è la somma di due tipi di punti: i punti <i>di consecuzio</i> e i punti <i>di interstizio</i>.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0142000012610000', forceResults: true } } key={ 7 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Il giocatore rosso guadagna 1 punto <i>di consecuzio</i> per ogni coppia di freccie consecutive verso il basso, il giovatore blu per ogni coppia verso l'alto.<br/>
                            Per assegnare i punti <i>di consecuzio</i> il colore delle frecce è indifferente: è importante solamente la loro direzione.
                        </div>
                    </div>
                </Step>
                <Step data={ { hash: '0124000000000000', forceResults: true } } key={ 8 }>
                    <div className="min-h-screen flex flex-row items-center justify-center">
                        <div className="w-full border-2 rounded-md border-text p-4 bg-background">
                            Ogni giocatore guadagna tanti punti <i>di interstizio</i> in ogni intervallo tra due punti, quante sono le coppie di sue frecce che attraversano verso l'alto e verso il basso tale intervallo.
                        </div>
                    </div>
                </Step>
            </Scrollama>
            </div>
        </div>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <span className="text-7xl md:text-9xl">strali</span>
            <Link className="title-page-a text-xl" href={ route('home') }>gioca</Link>
        </div>
    </>)
}