import { Link } from "@inertiajs/inertia-react";
import { useState } from "react"
import SideColumn from "../GameGraphycs/SideColumn";


export default function title({type}) {

    return (<>
        <div className="w-screen h-screen flex flex-row items-stretch">
            <SideColumn side={1} />
            
            <div className="border-solid border-4 border-r-player1 grow " />
            
            <SideColumn side={2}/>
        </div>
    </>)
}