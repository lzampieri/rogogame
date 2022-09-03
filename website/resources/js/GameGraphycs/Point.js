import { Graphics } from "@inlet/react-pixi";
import { useCallback } from "react";
import theme from "../theme";
import { parseCol } from "../utils";


export default function Point( props ) {
    const draw = useCallback((g) => {
        g.clear();
        g.beginFill( parseCol( theme.colors.text ) );
        g.drawCircle( props.x, props.y, 10 );
        g.endFill();
    }, [props]);

    return <Graphics draw={draw} />
}