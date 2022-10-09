import { Link } from "@inertiajs/inertia-react";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


export default function titlePage( props ) {
    const unimplemeted = () => enqueueSnackbar( 'Opzione non ancora implementata', { variant: 'warning' } );

    return (<>
        <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
            <span className="text-7xl md:text-9xl">strali</span>
            { props.home && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <Link className="title-page-a" href={ route('game.select_players') }>gioca</Link>
                    <Link className="title-page-a" href={ route('arena') }>arena</Link>
                    <Link className="title-page-a" href={ route('rules') }>regole</Link>
                    <a className="title-page-a" onClick={ unimplemeted }>statistiche</a>
                    <Link className="title-page-a" href={ route('about') }>informazioni</Link>
                </div> )
            }
            { props.select_players && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={ () => window.history.back() }>&lt;</a>
                    <Link className="title-page-a" href={ route( 'game.select_smartness', { pl: '2pl' } ) }>2 giocatori</Link>
                    <Link className="title-page-a" href={ route( 'game.select_smartness', { pl: '1pl' } ) }>1 giocatore</Link>
                    <Link className="title-page-a" href={ route( 'game.select_smartness', { pl: '0pl' } ) }>0 giocatori</Link>
                </div> )
            }
            { props.select_smartness && 
                ( <div className="flex flex-col md:flex-row justify-center items-center text-xl pt-4">
                    <a className="title-page-a" onClick={ () => window.history.back() }>&lt;</a>
                    <Link className="title-page-a" href={ route( 'game.play', { pl: props.pl, type: 'random'}        ) }>Facile</Link>
                    <Link className="title-page-a" href={ route( 'game.play', { pl: props.pl, type: 'probs'}         ) }>Medio</Link>
                    <Link className="title-page-a" href={ route( 'game.play', { pl: props.pl, type: 'squared_probs'} ) }>Difficile</Link>
                    <Link className="title-page-a" href={ route( 'game.play', { pl: props.pl, type: 'fifth_probs'}   ) }>Impossibile</Link>
                </div> )
            }
        </div>
    </>)
}