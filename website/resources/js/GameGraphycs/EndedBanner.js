

export default function EndedBanner( props ) {
    if( !props.gameState.ended() ) return null;
    return (
        <div className="absolute w-full top-0 text-center">
            Gioco terminato!
        </div>
    )
}
