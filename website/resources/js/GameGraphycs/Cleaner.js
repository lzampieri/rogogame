import { Graphics } from "@inlet/react-pixi";
import { useCallback } from "react";

export default function Cleaner( props ) {
    const draw = useCallback((g) => {
    }, [props]);
    console.log("Cleaned");

    return <Graphics draw={draw} />
}