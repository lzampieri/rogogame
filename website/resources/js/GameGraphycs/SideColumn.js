import { faB, faBrain, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import theme from "../theme";
import { useBreakpoint } from "../useBreakpoints";
import Arrow from "./Arrow";


export default function SideColumn( props ) {
    let contenuto = "";
    const isMd = useBreakpoint( 'md' );
    if( props.active ) {
        if( props.ai )
            contenuto = "Ragionando..."
        else
            contenuto = "È il turno del giocatore " + ( props.side == 1 ? 'rosso' : 'blu' );
    }
    if( props.winner && isMd )
        contenuto = "Vincitore!"

    return (
        <div className="
            flex
               flex-row    h-[10%]     w-full
            md:flex-col md:h-full   md:w-1/5
            justify-between items-center
            ">
            <span className="mt-2 text-4xl">
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