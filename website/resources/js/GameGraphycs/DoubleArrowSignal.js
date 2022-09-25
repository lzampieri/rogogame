import { RegularPolygon } from "react-konva";
import theme from "../theme";

export default function DoubleArrowSignal( props ) {
    let measure = ( props.ys[1] - props.ys[0] ) / 10;
    let polys = {
        x: props.x + 4 * measure * ( props.player == 1 ? 1 : -1 ),
        y: props.ys[ props.node ],
        radius: 2.5 * measure,
        rotation: ( props.player == 1 ? 30 : -30 )
    }

    return (
        <RegularPolygon
            {...polys}
            sides={3}
            fill={ props.player == 1 ? theme.colors.player1.main : theme.colors.player2.main }
            />
    )
}