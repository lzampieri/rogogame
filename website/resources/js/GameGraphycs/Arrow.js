import { useEffect, useRef, useState } from "react"
import { Layer, RegularPolygon, Stage } from "react-konva"
import { useBreakpoint } from "../useBreakpoints"


export default function Arrow( props ) {
    const maxDim = 100
    const [ dim, setDim ] = useState( 100 )
    const isMd = useBreakpoint( 'md' )
    const ref = useRef(null)

    useEffect( () => {
        function resizeDetected() {
            // If vertical (i.e. >md) use the width
            if( isMd )
                setDim( maxDim > ref.current.offsetWidth ? ref.current.offsetWidth : maxDim )
            // Else use the height
            else
                setDim( maxDim > ref.current.offsetHeight ? ref.current.offsetHeight : maxDim )
        }
        window.addEventListener( 'resize', resizeDetected )
        resizeDetected()
        return () => window.removeEventListener( 'resize', resizeDetected )
    } )

    const side = dim * 0.8
    let polys = {}
    if( props.direction == 'up' ) {
        polys = { x: dim/2, y: dim/2 + side*0.144, radius: side/1.73 }
    } else {
        polys = { x: dim/2, y: dim/2 - side*0.144, radius: side/1.73, rotation: 60 }
    }

    return (
        <div
            className={
                "flex justify-center my-4 " +
                "   h-full    w-auto    flex-col " +
                "md:h-auto md:w-full md:flex-row " +
                ( props.pulsing ? 'animate-pulse' : '' )
                }
            ref={ref}>
            <Stage
                width={dim} height={dim}>
                <Layer>
                    <RegularPolygon
                        {...polys}
                        sides={3}
                        fill={ props.color }
                        opacity={ props.active ? 1 : 0.2 }
                        />
                </Layer>
            </Stage>
        </div>
    )
}