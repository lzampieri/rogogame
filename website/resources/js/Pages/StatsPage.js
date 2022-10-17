import { Link } from "@inertiajs/inertia-react";
import { Component } from "react";
import StatsSection from "../OtherComponents/StatsSection";


export default class StatsPage extends Component {
    pages = {
        '0pl' : "0 giocatori",
        '1plr': "1 giocatore (rosso)",
        '1plb': "1 giocatore (blu)",
        '2pl' : "2 giocatori",
        'are' : "Arena",
    }

    difficulties = {
        'random': 'facili',
        'easy': 'medie',
        'medium': 'difficili',
        'hard': 'impossibili'
    }

    constructor(props) {
        super(props);
        this.state = {
            page: '2pl'
        }
    }

    render() {
        let data = this.props.stats;

        return (
            <div className="w-screen min-h-screen flex flex-col justify-items-stretch items-stretch p-4 gap-4">
                <div className="flex flex-col md:flex-row items-center justify-center sticky top-0 bg-background z-10">
                    { Object.entries( this.pages ).map( ([ k, n ]) =>
                        <span
                            className={ "title-page-a" + ( this.state.page == k ? " underline font-bold" : "" ) }
                            key={k}
                            onClick={ () => this.setState( { page: k } ) } >
                            {n}
                        </span>
                    )}
                    <Link className="title-page-a" key='home' href={ route('home') }>Home</Link>
                </div>

                <div className="grow flex flex-col items-center justify-center gap-4">

                    {/* Zero players */}
                    { Object.entries( this.difficulties ).map( ([ k, n ]) =>
                        <StatsSection
                            show={ this.state.page == '0pl' }
                            key={ '0pl'+k }
                            descr={ n }
                            data={ data.zeropl[k] }
                            />
                    )}

                    {/* One players red */}
                    { Object.entries( this.difficulties ).map( ([ k, n ]) =>
                        <StatsSection
                            show={ this.state.page == '1plr' }
                            key={ '1plr'+k }
                            descr={ n }
                            data={ data.oneplr[k] }
                            />
                    )}
                    
                    {/* One players blu */}
                    { Object.entries( this.difficulties ).map( ([ k, n ]) =>
                        <StatsSection
                            show={ this.state.page == '1plb' }
                            key={ '1plb'+k }
                            descr={ n }
                            data={ data.oneplb[k] }
                            />
                    )}

                    {/* Two players */}
                    <StatsSection
                        show={ this.state.page == '2pl' }
                        key='2pl'
                        data={ data.twopl }
                        />

                    {/* Arena */}
                    <StatsSection
                        show={ this.state.page == 'are' }
                        key='are'
                        data={ data.arena }
                        />

                </div>
            </div>
        )
    }

}