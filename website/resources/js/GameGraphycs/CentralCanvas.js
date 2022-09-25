import { useEffect, useRef, useState } from "react"
import { Circle, Layer, RegularPolygon, Stage } from "react-konva"
import theme from "../theme"
import Connect from "./Connect"
import linspace from "linspace"
import StateOfGame from "./StateOfGame"
import NewArrowsDrawer from "./NewArrowsDrawer"


export default function CentralCanvas( props ) {
    const [ L, setL ] = useState( 100 )
    const [ H, setH ] = useState( 100 )
    const ref = useRef(null)

    useEffect( () => {
        function resizeDetected() {
            setL( ref.current.offsetWidth )
            setH( ref.current.offsetHeight )
        }
        window.addEventListener( 'resize', resizeDetected )
        resizeDetected()
        return () => window.removeEventListener( 'resize', resizeDetected )
    } )

    const mid_x = L/2
    const ys = linspace( 0.2 * H, 0.8 * H, 8 )

    return (
        <div className="w-full grow flex flex-row justify-center my-4" ref={ref}>
            <Stage
                width={L} height={H}>
                <StateOfGame mid_x={ mid_x } ys={ ys } gamestate={ props.gamestate } />
                <NewArrowsDrawer
                    mid_x={ mid_x } ys={ ys } width={L} height={H}
                    color={ props.gamestate.nextPlayer() == 1 ? theme.colors.player1.parque : theme.colors.player2.parque }
                    addArrow={ (arr) => props.addArrow( arr ) }
                    active={ props.drawingActive }
                    />
            </Stage>
        </div>
    )
}