import { useState } from "react";
import { Arrow, Circle, Layer, Rect } from "react-konva";
import GameState from "../GameLogic/GameState";
import theme from "../theme"


export default function NewArrowsDrawer( props ) {
    const [ bg, setbg ] = useState( theme.colors.background )
    const step = ( props.ys[1] - props.ys[0] ) / 3;
    const [ from, setFrom ] = useState( -1 )
    const [ mouse, setMouse ] = useState()

    function isNear( pos ) {
        let point = -1
        if( Math.abs( pos.x - props.mid_x ) < step ) {
            props.ys.some( ( y, i ) => {
                if( Math.sqrt( ( pos.x - props.mid_x )**2 + ( pos.y - y )**2 ) < step ) {
                    point = i
                    return true
                }
                return false
            })
        }
        return point
    }

    function manageOnPointerDown( e ) {
        if( !props.active ) return;
        const pos = e.target.getStage().getPointerPosition()
        setMouse( pos );
        setFrom( isNear( pos ) )
    }
    function manageOnPointerMove( e ) {
        if( !props.active ) return;
        if( from > -1 ) {
            const pos = e.target.getStage().getPointerPosition()
            const point = isNear( pos )
            if( point > -1 ) setMouse( { x: props.mid_x, y: props.ys[ point ] } )
            else setMouse( pos );
        }
    }
    function manageOnPointerUp( e ) {
        if( !props.active ) return;
        const to = isNear( e.target.getStage().getPointerPosition() )
        if( to > -1 ) {
            props.addArrow( GameState.arr( from, to ) )
        }
        setFrom( -1 )
    }

    return (
        <Layer
            onPointerDown={ (e) => manageOnPointerDown( e ) }
            onPointerMove={ (e) => manageOnPointerMove( e ) }
            onPointerUp={ (e) => manageOnPointerUp( e ) }
            >
            <Rect
                x = { 0 } y = { 0 }
                width = { props.width } height={ props.height }
                />
            { from > -1 && 
                <Arrow
                    points={ [ props.mid_x, props.ys[from], mouse.x, mouse.y ] }
                    tension={ 1 }
                    fill={ props.color }
                    stroke={ props.color }
                />
            }
        </Layer>
    )
}