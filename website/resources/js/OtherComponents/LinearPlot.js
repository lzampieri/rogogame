

export default function LinearPlot( props ) {
    if( isNaN( props.redfraction ) || isNaN( props.blufraction ) ) return "";
    let tiefraction = 1 - props.redfraction - props.blufraction;
    return (
        <div className="w-3/4 md:w-1/3 grow">
            <div className="flex flex-row h-4 border border-black mb-2">
                <div className="bg-player1-main" style={{ width: "" + ( props.redfraction * 100 ) + "%" }} />
                <div className="bg-white"        style={{ width: "" + ( tiefraction * 100 ) + "%" }} />
                <div className="bg-player2-main" style={{ width: "" + ( props.blufraction * 100 ) + "%" }} />
            </div>
            <div className="flex flex-row h-4">
                <div className="text-player1-main min-w-fit text-xl text-center" style={{ width: "" + ( props.redfraction * 100 ) + "%" }}>{parseInt(props.redfraction * 100)}<small>%</small></div>
                <div className="text-black min-w-fit        text-xl text-center" style={{ width: "" + ( tiefraction * 100 ) + "%" }}>      {parseInt(tiefraction       * 100)}<small>%</small></div>
                <div className="text-player2-main min-w-fit text-xl text-center" style={{ width: "" + ( props.blufraction * 100 ) + "%" }}>{parseInt(props.blufraction * 100)}<small>%</small></div>
            </div>
        </div>
    )
}