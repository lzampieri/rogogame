import { Sprite, Stage } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import Cleaner from "./Cleaner";
import PlayersTriangles from "./PlayersTriangles";
import Point from "./Point";

export default function Playground() {
    const [ h, setH ] = useState( window.innerHeight * 0.9 );
    const [ w, setW ] = useState( window.innerWidth * 0.9 );

    // Watch for window resize
    useEffect(() => {
        const listener = () => { setH( window.innerHeight * 0.9 ); setW( window.innerWidth * 0.9 ); }
        window.addEventListener('resize', listener );
        return () => { window.removeEventListener('resize', listener ); }
        }, [])
    
    const positions = [ 1/9, 2/9, 3/9, 4/9, 5/9, 6/9, 7/9, 8/9 ].map( x => x * h )

    return (<>
        <Stage width={w} height={h} options={{ backgroundAlpha: 0, antialias: true }}>
            { positions.map( (p, i) => 
                <Point x={w/2} y={p} key={i} />
            )}
            <PlayersTriangles w={w} h={h} selected={2} />
        </Stage>
    </>)
}