import { useState } from "react";
import Arrow from "./Arrow";


export default function SideColumn( props ) {
    const [ active, setActive ] = useState( false )
    return (
        <div className="
            w-1/5
            flex flex-col justify-between items-center
            ">
            <span>Questo sopra</span>
            <span onClick={ () => setActive( !active ) }>Questo {props.side}</span>
            <Arrow
                color={ props.side == 1 ? 'red' : 'blue' }
                direction={ props.side == 1 ? 'up' : 'down' }
                active={ active } />
        </div>
    )
}