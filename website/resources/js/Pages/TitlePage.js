import { Link } from "@inertiajs/inertia-react";
import { useState } from "react"


export default function title() {
    const [page, setPage] = useState( 0 );

    return (<>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <span className="text-7xl md:text-9xl">strali</span>
            { page == 0 && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={() => setPage(1)}>gioca</a>
                    <a className="title-page-a">regole</a>
                    <a className="title-page-a">statistiche</a>
                    <a className="title-page-a">informazioni</a>
                </div> )
            }
            { page == 1 && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={() => setPage(0)}>&lt;</a>
                    <a className="title-page-a" onClick={() => setPage(12)}>2 giocatori</a>
                    <a className="title-page-a" onClick={() => setPage(11)}>1 giocatore</a>
                    <a className="title-page-a" onClick={() => setPage(10)}>0 giocatori</a>
                </div> )
            }
            { page == 11 && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={() => setPage(1)}>&lt;</a>
                    <Link className="title-page-a" href={route('game_1pl',{'type':'random'})}>Facile</Link>
                    <Link className="title-page-a" href={route('game_1pl',{'type':'probs'})}>Medio</Link>
                    <Link className="title-page-a" href={route('game_1pl',{'type':'squared_probs'})}>Difficile</Link>
                    <Link className="title-page-a" href={route('game_1pl',{'type':'fifth_probs'})}>Impossibile</Link>
                </div> )
            }
            { page == 10 && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={() => setPage(1)}>&lt;</a>
                    <Link className="title-page-a" href={route('game_0pl',{'type':'random'})}>Facile</Link>
                    <Link className="title-page-a" href={route('game_0pl',{'type':'probs'})}>Medio</Link>
                    <Link className="title-page-a" href={route('game_0pl',{'type':'squared_probs'})}>Difficile</Link>
                    <Link className="title-page-a" href={route('game_0pl',{'type':'fifth_probs'})}>Impossibile</Link>
                </div> )
            }
        </div>
    </>)
}