import { useState } from "react";
import Arrow from "./Arrow";


export default function SideColumn( props ) {
    let contenuto = "";
    if( props.active ) {
        if( props.ai )
            contenuto = "Ragionando..."
        else
            contenuto = "È il turno del giocatore " + ( props.side == 1 ? 'rosso' : 'blu' );
    }

    return (
        <div className="
            w-1/5
            flex flex-col justify-between items-center
            ">
            <span>{ props.ai ? "AI" : "Reale" }</span>
            <span>
                { contenuto }
            </span>
            <Arrow
                color={ props.side == 1 ? 'red' : 'blue' }
                direction={ props.side == 1 ? 'up' : 'down' }
                active={ props.active }
                pulsing={ props.active && props.ai } />
        </div>
    )
}