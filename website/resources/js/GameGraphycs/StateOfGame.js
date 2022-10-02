import { Circle, Layer } from "react-konva"
import theme from "../theme"
import Connect from "./Connect"
import DoubleArrowSignal from "./DoubleArrowSignal";
import DoubleCrossingSignal from "./DoubleCrossingSignal";

export default function StateOfGame( props ) {
    let results = (<></>)
    let force = props.forceResults || false
    if( ( props.gamestate.ended() || force ) && !( props.forceNoResults || false ) ) {
        let outcome = props.gamestate.results( force );
        results = (
            <>
            { outcome.double_arrows_red.map( a =>
                <DoubleArrowSignal node={a} player={ 1 } x={ props.mid_x } ys={props.ys} key={ 100 + a } />
            ) }
            { outcome.double_arrows_blu.map( a =>
                <DoubleArrowSignal node={a} player={ 2 } x={ props.mid_x } ys={props.ys} key={ 200 + a } />
            ) }
            { outcome.double_crossing_red.map( (c, i) =>
                <DoubleCrossingSignal space={i} count={c} player={ 1 } x={ props.mid_x } ys={props.ys} key={ 300 + i } />
            ) }
            { outcome.double_crossing_blu.map( (c, i) =>
                <DoubleCrossingSignal space={i} count={c} player={ 2 } x={ props.mid_x } ys={props.ys} key={ 400 + i } />
            ) }
            </>
        )
    }
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
                <Connect arrow={a} color={ theme.colors.player1.parque } x={ props.mid_x } ys={props.ys} key={a} />
            ) }
            { props.gamestate.arrows_blu.map( a =>
                <Connect arrow={a} color={ theme.colors.player2.parque } x={ props.mid_x } ys={props.ys} key={a} />
            ) }
            { props.arrows_extra && props.arrows_extra.map( a =>
                <Connect arrow={a} color={ theme.colors.player1.main } x={ props.mid_x } ys={props.ys} key={a} dashed />
            ) }
            { results }
        </Layer>
    )
}