

export default function Modal( props ) {
    if( !props.visible ) return "";
    return (
        <div className="
            w-full h-full absolute top-0 right-0
            z-40
            bg-black
            flex flex-col items-center justify-center
            ">
            <div className="
                min-w-[20%] min-h-[20%]
                rounded border bg-background
                flex flex-col justify-center items-center
                text-center
                gap-4 p-4
            ">
                { props.children }
            </div>
        </div>
    )
}