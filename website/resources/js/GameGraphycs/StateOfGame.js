import { Circle, Layer } from "react-konva"
import theme from "../theme"
import Connect from "./Connect"

export default function StateOfGame( props ) {
    return (      
        <Layer>
            { props.ys.map( (y, i) => (
                <Circle
                    x = {props.mid_x} y = {y}
                    radius = {5}
                    fill = { theme.colors.text }
                    key={i} />
            ))}
            { props.gamestate.arrows_red.map( a =>
                <Connect arrow={a} color={ theme.colors.player1 } x={ props.mid_x } ys={props.ys} key={a} />
            ) }
            { props.gamestate.arrows_blu.map( a =>
                <Connect arrow={a} color={ theme.colors.player2 } x={ props.mid_x } ys={props.ys} key={a} />
            ) }
        </Layer>
    )
}