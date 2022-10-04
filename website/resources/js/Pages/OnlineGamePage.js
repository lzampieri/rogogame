import { useState } from "react";
import RemoteManager from "../GameLogic/RemoteManager";

export default function onlineGamePage( props ) {
    const [message,setMessage] = useState( "loading..." );

    if( message == 'loading...') {
        let remoteManager = new RemoteManager( );
        setMessage( remoteManager.connect( props.token ) );
    }

    return (<>
        <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
            <span className="text-7xl md:text-9xl">strali</span>
            <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                { JSON.stringify(message) }
            </div>
        </div>
    </>)
}