import { faBrain, faMicrochip, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AIPlayer, RealPlayer, RedPlayer, RemotePlayer } from "../GameLogic/Enumerators";
import theme from "../theme";
import { useBreakpoint } from "../useBreakpoints";
import Arrow from "./Arrow";


export default function SideColumn( props ) {
    let contenuto = "";
    const isMd = useBreakpoint( 'md' );
    if( props.gamestate.nextPlayer() == props.side ) {
        if( props.gamestate.playerType( props.side ) == AIPlayer )
            contenuto = "Ragionando..."
        else if( props.gamestate.playerType( props.side ) == RemotePlayer )
            contenuto = "In attesa..."
        else
            contenuto = "È il turno del giocatore " + ( props.side == RedPlayer ? 'rosso' : 'blu' );
    }
    if( props.gamestate.ended() && props.gamestate.results().winner == props.side && isMd )
        contenuto = "Vincitore!"

    const icons = {
        [ RealPlayer ]: faBrain,
        [ AIPlayer ]: faMicrochip,
        [ RemotePlayer ]: faPhone
    }

    let active = props.gamestate.nextPlayer() == props.side
    if( props.gamestate.ended() && props.gamestate.results().winner == props.side )
        active = true;

    let waiting = ( props.gamestate.nextPlayer() == props.side ) && ( props.gamestate.playerType( props.side ) != RealPlayer )

    return (
        <div className="
            flex
               flex-row    h-[10%]     w-full
            md:flex-col md:h-full   md:w-1/5
            justify-between items-center
            ">
            <span className="mt-2 text-4xl">
                <FontAwesomeIcon icon={ icons[ props.gamestate.playerType( props.side ) ] } />
            </span>
            <span>
                { contenuto }
            </span>
            <Arrow
                color={ props.side == RedPlayer ? theme.colors.player1.main : theme.colors.player2.main }
                direction={ props.side == RedPlayer ? 'down' : 'up' }
                active={ active }
                pulsing={ waiting }
                />
        </div>
    )
}