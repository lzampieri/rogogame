import { useEffect, useRef, useState } from "react"
import { Layer, RegularPolygon, Stage } from "react-konva"


export default function Arrow( props ) {
    const maxL = 100
    const [ L, setL ] = useState( 100 )
    const ref = useRef(null)

    useEffect( () => {
        function resizeDetected() {
            setL( maxL > ref.current.offsetWidth ? ref.current.offsetWidth : maxL )
        }
        window.addEventListener( 'resize', resizeDetected )
        resizeDetected()
        return () => window.removeEventListener( 'resize', resizeDetected )
    } )

    const side = L * 0.8
    let polys = {}
    if( props.direction == 'up' ) {
        polys = { x: L/2, y: L/2 + side*0.144, radius: side/1.73 }
    } else {
        polys = { x: L/2, y: L/2 - side*0.144, radius: side/1.73, rotation: 60 }
    }

    return (
        <div className="w-full flex flex-row justify-center my-4" ref={ref}>
            <Stage
                width={L} height={L}>
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