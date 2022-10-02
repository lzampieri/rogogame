import { Arrow } from "react-konva";
import GameState from "../GameLogic/GameState";

export default function Connect( props ) {
    const from = GameState.arr_from( props.arrow )
    const to = GameState.arr_to( props.arrow )
    const width = Math.min( 0.1 * props.x, ( props.ys[1] - props.ys[0] ) / 2 )
    const points = [
        props.x, props.ys[ from ],
        props.x + width * ( from - to ), ( props.ys[ from ] + props.ys[ to ] ) / 2,
        props.x, props.ys[ to ]
    ]
    return (
        <Arrow
            points={ points }
            tension={ 1 }
            fill={ props.color }
            stroke={ props.color }
            dash={[10, 5]}
            dashEnabled={ props.dashed || false }
        />
    )
}