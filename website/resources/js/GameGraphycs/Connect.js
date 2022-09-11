import { Arrow } from "react-konva";
import GameState from "../GameLogic/GameState";

export default function Connect( props ) {
    const from = GameState.arr_from( props.arrow )
    const to = GameState.arr_to( props.arrow )
    const points = [
        props.x, props.ys[ from ],
        props.x + 0.05 * props.x * ( from - to ), ( props.ys[ from ] + props.ys[ to ] ) / 2,
        props.x, props.ys[ to ]
    ]
    return (
        <Arrow
            points={ points }
            tension={ 1 }
            fill={ props.color }
            stroke={ props.color }
        />
    )
}