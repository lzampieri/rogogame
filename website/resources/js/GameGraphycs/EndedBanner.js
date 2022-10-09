import { Link } from "@inertiajs/inertia-react";


export default function EndedBanner( props ) {
    if( !props.gameState.ended() ) return null;
    return (
        <div className="absolute w-full top-0 flex flex-row justify-center">
            <div className="border-solid border-4 border-info rounded-2xl flex flex-col items-center m-2 px-8 py-2">
                <span className="text-3xl font-bold">
                    <span className="text-player1-main">{ props.gameState.results().points_red }</span>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <span className="text-player2-main">{ props.gameState.results().points_blu }</span>
                </span>
                <span>
                    { props.resetCallback && 
                        <span onClick={ props.resetCallback } className="underline cursor-pointer">Reset</span>
                    }
                    { props.resetCallback && "&nbsp;•&nbsp;" }
                    <Link href={ route( 'home' ) } className="underline cursor-pointer">Home</Link>
                </span>
            </div>
        </div>
    )
}
