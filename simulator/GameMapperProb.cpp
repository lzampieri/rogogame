#include "GameMapperProb.h"

using namespace std;

GameMapperProb::GameMapperProb( int N, PlayerType redType, PlayerType bluType ) : N ( N ) {
    
    players = new unordered_map< GamePlayer, PlayerType >();
    players->insert( pair< GamePlayer, PlayerType>( GamePlayer::Red, redType ) );
    players->insert( pair< GamePlayer, PlayerType>( GamePlayer::Blu, bluType ) );

    probs = new unordered_map< GameState, GameProbEsit, GameStateHasher >();
    possibleMoves = new unordered_map< GameState, vector< arrow >*, GameStateHasher >();
    gameStatesList = new vector< GameState >();
    gameStatesList->reserve( 6400000 );
    counts = new vector< int >( N + 1, 0 );
}

GameMapperProb::~GameMapperProb() {
    delete players;
    delete probs;
    delete counts;
}

GameProbEsit& GameMapperProb::get( const GameState gs ) {
    if( probs->count( gs ) > 0 ) {
        return probs->at( gs );
    }
    
    possibleMoves->insert( pair<GameState, vector<arrow>*>( gs, new vector<arrow>()) );
    GameProbEsit value = compute( gs, possibleMoves->at( gs ) );
    probs->insert( pair<GameState,GameProbEsit>(gs,value) );
    gameStatesList->push_back( gs );

    counts->at( gs.count() ) += 1;
    if( gs.count() < 3 ) {
        for( int i = 0; i < counts->size(); i++ )
            cout<<counts->at(i)<<'\t';
        cout<<endl;
    }

    return probs->at( gs );
}

GameProbEsit GameMapperProb::compute( const GameState gs, vector<arrow>* possibleInsertions ) {
    if( gs.ended() )
        return GameProbEsit( gs.winner() );
    if( players->at( gs.nextPlayer() ) == PlayerType::Smart )
        return computeSmart( gs, possibleInsertions );
    else return computeRand( gs, possibleInsertions );
}

GameProbEsit GameMapperProb::computeSmart( const GameState gs, vector<arrow>* possibleInsertions ) {
    arrow new_arrow;
    double best_win_prob = 0;
    double best_tie_prob = 0;
    GameProbEsit esit(0,0);
    GamePlayer next = gs.nextPlayer();

    for( arrow i = 0; i < N; i++ ) {
        for( arrow j = 0; j < N; j++ ) {
            if( i == j )
                continue;
            
            new_arrow = i * N + j;
            if( gs.drawable( new_arrow ) ) {
                possibleInsertions->push_back( new_arrow );
                GameProbEsit new_esit = get( gs + new_arrow );
                // if( new_esit.probWin( next ) == 1 )
                //     return new_esit;
                if(
                    ( new_esit.probWin( next ) > best_win_prob ) || 
                    ( ( new_esit.probWin( next ) == best_win_prob ) && ( new_esit.probTie() > best_tie_prob ) )
                ) {
                    esit = new_esit;
                    best_win_prob = new_esit.probWin( next );
                    best_tie_prob = new_esit.probTie();
                }

            }
        }
    }

    return esit;
}

GameProbEsit GameMapperProb::computeRand ( const GameState gs, vector<arrow>* possibleInsertions ) {
    arrow new_arrow;
    GameProbEsit esit( 0, 0 );
    int count = 0;

    for( arrow i = 0; i < N; i++ ) {
        for( arrow j = 0; j < N; j++ ) {
            if( i == j )
                continue;
            
            new_arrow = i * N + j;
            if( gs.drawable( new_arrow ) ) {
                possibleInsertions->push_back( new_arrow );
                esit += get( gs + new_arrow );
                count += 1;
            }
        }
    }

    return esit / count;
}