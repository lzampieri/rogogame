import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";

export default function aboutPage( props ) {

    return (<>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <span className="text-7xl md:text-9xl">strali</span>
            <span className="text-xl">informazioni</span>
            <FontAwesomeIcon icon={ faChevronDown } className="text-xl" />
        </div>
        <div className="w-full h-screen flex flex-col justify-center items-center text-xl text-center gap-4">
            <span>da una idea di Andrea Rogolino</span>
            <span>progetto grafico e implementazione di Leonardo Zampieri</span>
            <span>codice sorgente disponibile su <a href="https://github.com/lzampieri/rogogame" className="underline">github</a></span>
            <Link className="title-page-a text-xl mt-5" href={ route('home') }>gioca</Link>
        </div>
    </>)
}