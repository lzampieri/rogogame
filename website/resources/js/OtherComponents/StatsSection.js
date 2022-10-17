import LinearPlot from "./LinearPlot";


export default function StatsSection( props ) {
    return (
        <div className={"flex flex-col md:flex-row items-center justify-center gap-8 w-full md:w-2/3" + (props.show ? "" : " hidden")}>
            <div className="flex flex-row justify-center gap-2">
                <span className="text-8xl">{ props.data.total }</span>
                <div className="flex flex-col justify-start">
                    <span>partite</span>
                    { props.descr && <span>{props.descr}</span> }
                    <span>giocate</span>
                </div>
            </div>
            <LinearPlot redfraction={ props.data.redwin / props.data.total } blufraction={ props.data.bluwin / props.data.total } />
        </div>
    )
}