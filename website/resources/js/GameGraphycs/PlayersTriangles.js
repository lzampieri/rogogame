import { Graphics } from "@inlet/react-pixi";
import { useCallback } from "react";
import theme from "../theme";
import { parseCol } from "../utils";

export default function PlayersTriangles( props ) {
    const side = 40;
    const pad = 8;
    const h = side * 0.866;
    const alpha = 0.4;
    const draw = useCallback((g) => {
        g.clear();
        g.beginFill( parseCol( theme.colors.player1 ), props.selected == 1 ? alpha : 1 );
        g.drawPolygon( pad, props.h - pad, pad + side, props.h - pad, pad + side/2, props.h - pad - h );
        g.endFill();
        g.beginFill( parseCol( theme.colors.player2 ), props.selected == 2 ? alpha : 1 );
        g.drawPolygon( props.w - pad, props.h - pad - h, props.w - pad - side, props.h - pad - h, props.w - pad - side/2, props.h - pad );
        g.endFill();
    }, [props]);

    return <Graphics draw={draw} />
}