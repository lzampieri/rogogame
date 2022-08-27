// #include "GameMapper.h"

// using namespace std;

// GameMapper::GameMapper( int N ) : N ( N ) {
//     map = new unordered_map< GameState, GameEsit, GameStateHasher >();
//     counts = new vector< int >( N + 1, 0 );
// }

// GameMapper::~GameMapper() {
//     delete map;
//     delete counts;
// }

// GameEsit GameMapper::get( const GameState gs ) {
//     if( map->count( gs ) > 0 ) {
//         return map->at( gs );
//     }
    
//     GameEsit value = compute( gs );
//     map->insert( pair<GameState,GameEsit>(gs,value) );

//     counts->at( gs.count() ) += 1;
//     if( gs.count() < 3 ) {
//         for( int i = 0; i < counts->size(); i++ )
//             cout<<counts->at(i)<<'\t';
//         cout<<endl;
//     }

//     return value;
// }

// GameEsit GameMapper::compute( const GameState gs ) {
//     if( gs.ended() )
//         return gs.winner();

//     arrow new_arrow;
//     GameEsit expected = GameEsit( gs.nextPlayer() );
//     bool tie = false;

//     for( arrow i = 0; i < N; i++ ) {
//         for( arrow j = 0; j < N; j++ ) {
//             if( i == j )
//                 continue;
            
//             new_arrow = i * N + j;
//             if( gs.drawable( new_arrow ) ) {
//                 GameEsit esit = get( gs + new_arrow );
//                 if( esit == expected )
//                     return esit;
                
//                 if( esit == GameEsit::Tie )
//                     tie = true;
                
//             }
//         }
//     }

//     if( tie )
//         return GameEsit::Tie;
    
//     else return GameEsit( - expected );
// }