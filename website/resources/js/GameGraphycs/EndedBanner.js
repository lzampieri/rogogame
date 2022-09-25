

export default function EndedBanner( props ) {
    if( !props.gameState.ended() ) return null;
    return (
        <div className="absolute w-full top-0 flex flex-row justify-center">
            <div className="border-solid border-4 border-info rounded-2xl flex flex-col items-center m-2 px-8 py-2">
                <span className="text-3xl font-bold">
                    <span className="text-player1-main">{ props.gameState.results().points_red }</span>
                    -
                    <span className="text-player2-main">{ props.gameState.results().points_blu }</span>
                </span>
                <span onClick={ props.resetCallback } className="underline cursor-pointer">Reset</span>
            </div>
        </div>
    )
}
