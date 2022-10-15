#include <iostream>
#include <unordered_map>

#include "GameMapperProb.h"
#include "DataWriter.h"

using namespace std;

int main( int argc, char *argv[] ) {
    int N = 8;
    if( argc > 1 ) {
        N = atoi( argv[1] );
    }

    GameState gs0( N );

    cout<<"Creo gli oggetti usando un reticolo di "<<N<<" vertici;"<<endl;
    cout<<"e partendo dalla situazione: "<<gs0.toString()<<endl;
    GameMapperProb gmp_red( N, PlayerType::Smart, PlayerType::Random );
    GameMapperProb gmp_blu( N, PlayerType::Random, PlayerType::Smart );

    GameProbEsit gpe_red = gmp_red.get( gs0 );
    GameProbEsit gpe_blu = gmp_blu.get( gs0 );

    cout<<"Rosso furbo, blu scemo\n";
    cout<<"Prob. Vittoria rosso: "<<gpe_red.probWin( GamePlayer::Red )<<"\n"
        <<"Prob. Pareggio: "<<gpe_red.probTie()<<"\n"
        <<"Prob. Vittoria blu: "<<gpe_red.probWin( GamePlayer::Blu )<<endl;

    cout<<"Rosso scemo, blu furbo\n";
    cout<<"Prob. Vittoria rosso: "<<gpe_blu.probWin( GamePlayer::Red )<<"\n"
        <<"Prob. Pareggio: "<<gpe_blu.probTie()<<"\n"
        <<"Prob. Vittoria blu: "<<gpe_blu.probWin( GamePlayer::Blu )<<endl;

    cout<<"Finito!"<<endl;

    DataWriter writer;

    cout<<"Going to print "<<gmp_red.possibleMoves->size()<<" rows"<<endl;

    for( const GameState& gs : *gmp_red.gameStatesList ) {

        GamePlayer lastPlayer = GamePlayer( - gs.nextPlayer() );

        // Always watch from the point of view of last player!
        GameMapperProb* gmp = ( lastPlayer == GamePlayer::Red ? &gmp_red : &gmp_blu );

        // cout<< ( lastPlayer == GamePlayer::Red ? "Red" : "Blu" ) << '\t' << writer.state_code( gs ) << '\t' << gmp->get( gs ).probWin( lastPlayer ) << '\n';

        writer.evolved_write_row(
            gs,
            gmp->possibleMoves->at( gs ),
            gmp->get( gs ).probWin( lastPlayer ),
            gmp->get( gs ).probTie()
            );

    }

    writer.close();
    
    system("PAUSE"); 

    return 0;
}