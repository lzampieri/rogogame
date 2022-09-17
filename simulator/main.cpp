#include <iostream>
#include <unordered_map>

#include "GameMapperProb.h"
#include "DataWriter.h"

using namespace std;

int main() {
    int N = 8;
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
    GameStateHasher gst;

    cout<<"Going to print "<<gmp_red.possibleMoves->size()<<" rows"<<endl;

    // Mosse che deve fare il rosso
    for( const GameState& gs : *gmp_red.gameStatesList ) {
        if( gs.nextPlayer() != GamePlayer::Red ) continue;

        const GameProbEsit& est = gmp_red.get( gs );
        writer.write_row( gs, gmp_red.possibleMoves->at( gs ), est.probWin( GamePlayer::Red ), est.probTie() );
    }

    cout<<"Going to print "<<gmp_blu.possibleMoves->size()<<" rows"<<endl;
    // Mosse che deve fare il blu
    for( const GameState& gs : *gmp_blu.gameStatesList ) {
        if( gs.nextPlayer() != GamePlayer::Blu ) continue;

        const GameProbEsit& est = gmp_blu.get( gs );
        writer.write_row( gs, gmp_blu.possibleMoves->at( gs ), est.probWin( GamePlayer::Blu ), est.probTie() );
    }

    writer.close();

    cout<<"The maximum hash obtained is " << GameStateHasher::maximum << endl;
    
    system("PAUSE"); 

    return 0;
}