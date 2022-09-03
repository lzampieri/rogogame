import { Link } from "@inertiajs/inertia-react";
import { useState } from "react"
import Playground from "../GameGraphycs/Playground";


export default function title({type}) {

    return (<>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Playground />
        </div>
    </>)
}