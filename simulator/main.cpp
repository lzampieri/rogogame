#include <iostream>
#include <fstream>
#include <filesystem>

#include "GameMapperProb.h"
#include "date.h"

using namespace std;

int main() {
    int N = 8;
    PlayerType redType = PlayerType::Smart;
    PlayerType bluType = PlayerType::Random;
    GameState gs0( N );

    cout<<"Creo gli oggetti usando un reticolo di "<<N<<" vertici;"<<endl;
    cout<<"e partendo dalla situazione: "<<gs0.toString()<<endl;
    GameMapperProb gmp( N, redType, bluType );

    cout<<"Calcolo l'esito con il giocatore rosso "<<( redType == PlayerType::Smart ? "intelligente" : "casuale")
        <<" e il giocatore blu "<<( bluType == PlayerType::Smart ? "intelligente" : "casuale")<<endl;
    GameProbEsit gpe = gmp.get( gs0 );
    cout<<"Prob. Vittoria rosso: "<<gpe.probWin( GamePlayer::Red )<<"\n"
        <<"Prob. Pareggio: "<<gpe.probTie()<<"\n"
        <<"Prob. Vittoria blu: "<<gpe.probWin( GamePlayer::Blu )<<endl;
    cout<<"Finito!"<<endl;

    string filename = "details_" + date::format("%Y%m%d", chrono::system_clock::now());
    int progressive = 0;
    while( filesystem::exists( filename + "_" + to_string( progressive ) + ".txt" ) )
        progressive ++;
    filename += "_" + to_string( progressive ) + ".txt";

    ofstream out( filename );
    out<<"Using "<<N<<" vertices\n"
       <<"Starting by "<<gs0.toString()<<"\n"
       <<"Red player start"<<"\n"
       <<"Red player "<<( redType == PlayerType::Smart ? "is smart" : "plays randomly")<<"\n"
       <<"Blu player "<<( bluType == PlayerType::Smart ? "is smart" : "plays randomly")<<"\n"
       <<"\nthe final winning probabilities are:\n"
       <<"Red win: "<<gpe.probWin( GamePlayer::Red )*100<<"%\n"
       <<"Tie    : "<<gpe.probTie(                 )*100<<"%\n"
       <<"Blu win: "<<gpe.probWin( GamePlayer::Blu )*100<<"%\n"
       <<endl;
    out.close();

    system("PAUSE"); 

    return 0;
}