import { faB, faBrain, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import theme from "../theme";
import Arrow from "./Arrow";


export default function SideColumn( props ) {
    let contenuto = "";
    if( props.active ) {
        if( props.ai )
            contenuto = "Ragionando..."
        else
            contenuto = "È il turno del giocatore " + ( props.side == 1 ? 'rosso' : 'blu' );
    }
    if( props.winner )
        contenuto = "Vincitore!"

    return (
        <div className="
            w-1/5
            flex flex-col justify-between items-center
            ">
            <span class="mt-2 text-4xl">
                <FontAwesomeIcon icon={ props.ai ? faMicrochip : faBrain } />
            </span>
            <span>
                { contenuto }
            </span>
            <Arrow
                color={ props.side == 1 ? theme.colors.player1.main : theme.colors.player2.main }
                direction={ props.side == 1 ? 'down' : 'up' }
                active={ props.active || props.winner }
                pulsing={ props.active && props.ai }
                />
        </div>
    )
}