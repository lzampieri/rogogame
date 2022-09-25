import { Line } from "react-konva";
import theme from "../theme";

export default function DoubleCrossingSignal( props ) {
    if( props.count == 0 ) return <></>;
    
    let measure = ( props.ys[1] - props.ys[0] ) * ( props.player == 1 ? -1 : +1 );
    let y = ( props.ys[ props.space ] + props.ys[ props.space + 1 ] ) / 2;
    let points = (i) => [
        props.x + measure * 3.2 + measure * 0.25 * i, y,
        props.x + measure * 3.4 + measure * 0.25 * i, y,
        props.x + measure * 3.3 + measure * 0.25 * i, y,
        props.x + measure * 3.3 + measure * 0.25 * i, y + measure * 0.1,
        props.x + measure * 3.3 + measure * 0.25 * i, y - measure * 0.1
    ]
    let iterate_on = new Array( props.count );
    for( let i = 0; i < props.count; i++ ) iterate_on[i] = 1;

    return (
        <>
        {
            iterate_on.map( ( el, i ) =>
            <Line
                    points={ points(i) }
                    stroke={ props.player == 1 ? theme.colors.player1.main : theme.colors.player2.main }
                    key={i}
                    />
            )   
        }
        </>
    )
}