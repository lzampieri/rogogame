#include "GameState.h"

using namespace std;

short GameState::all_arrows_size() const {
    return arrows_red->size() + arrows_blu->size();
}

arrow GameState::all_arrows_at( short i ) const {
    if( i < arrows_red->size() )
        return arrows_red->at( i );
    else return arrows_blu->at( i - arrows_red->size() );
}

GameState::GameState( arrow N ) : N( N ) {
    arrows_red = new vector<arrow>();
    arrows_blu = new vector<arrow>();
}

GameState::GameState(const GameState &old_gs) {
    N = old_gs.N;
    arrows_red = new vector<arrow>( *old_gs.arrows_red );
    arrows_blu = new vector<arrow>( *old_gs.arrows_blu );
}

GameState::~GameState() {
    delete arrows_red;
    delete arrows_blu;
}

bool GameState::operator==( const GameState &other ) const {
    return ( *arrows_red == *other.arrows_red ) && ( *arrows_blu == *other.arrows_blu );
}

GameState& GameState::operator+=( const arrow a ) {
    if( arrows_red->size() + arrows_blu->size() >= N )
        throw std::domain_error("The game is already finished!");
    if( !drawable( a ) )
        throw std::domain_error("The last arrow violates game rule!");


    if( arrows_blu->size() < arrows_red->size() ) {
        arrows_blu->push_back( a );
        sort( arrows_blu->begin(), arrows_blu->end() );
    } else {
        arrows_red->push_back( a );
        sort( arrows_red->begin(), arrows_red->end() );
    }
    return *this;
}

GameState operator+( const GameState& old_gs, const arrow a ) {
    return GameState( old_gs )+=a;
}

bool GameState::ended() const {
    if( arrows_red->size() + arrows_blu->size() >= N )
        return true;
    return false;
}

arrow GameState::count() const {
    return arrows_red->size() + arrows_blu->size();
}

bool GameState::drawable( arrow a ) const {
    arrow from = arr_from( a );
    arrow to = arr_to( a );
    if( ( to > N ) || ( from == to ) )
        throw std::domain_error("Trying to deposit invalid arc!");

    // Check for arc length
    if( arr_len( a ) > all_arrows_size() )
        return false;
    
    // Check the arc is not already drawned
    // and that the departure and arrival vertices are available
    for( int i = 0; i < all_arrows_size(); i++ ) {
        if( a == all_arrows_at( i ) )
            return false;
        if( from == arr_from( all_arrows_at( i ) ) )
            return false;
        if( to == arr_to( all_arrows_at( i ) ) )
            return false;
    }

    // Check that there are no cycles
    short count = 0;
    for( int i = 0; i < all_arrows_size(); i++ ) {
        if( to == arr_from( all_arrows_at( i ) ) ) {
            to = arr_to( all_arrows_at( i ) );
            count += 1;
            i = -1;
            if( to == from ) {
                if( count < N - 1 )
                    return false;
            }
        }
    }

    return true;
}

GamePlayer GameState::nextPlayer() const {
    if( arrows_blu->size() < arrows_red->size() )
        return GamePlayer::Blu;
    else
        return GamePlayer::Red;
}

GameEsit GameState::winner() const {
    int points_red = 0;
    int points_blu = 0;
    arrow from, to;
    int dir;
    
    // Check for double arrows in the same direction
    for( int i = 0; i < all_arrows_size(); i++ ) {
        from = arr_from( all_arrows_at( i ) );
        to   = arr_to  ( all_arrows_at( i ) );

        for( int j = 0; j < all_arrows_size(); j++ ) {
            if( j == i )
                continue;
            if( arr_from( all_arrows_at( j ) ) == to ) {
                if( ( from < to ) && ( to < arr_to( all_arrows_at( j ) ) ) )
                    points_red += 1;
                if( ( from > to ) && ( to > arr_to( all_arrows_at( j ) ) ) )
                    points_blu += 1;
                break;
            }
        }
    }

    // Check for double occupied spaces
    // Red player
    vector<int> occupied_up( N-1, 0 ),
                occupied_dw( N-1, 0 );
    for( int i = 0; i < arrows_red->size(); i++ ) {
        from = arr_from( arrows_red->at( i ) );
        to   = arr_to  ( arrows_red->at( i ) );
        dir  = 1;

        if( from > to ) {
            swap( from, to );
            dir *= -1;
        }

        for( int j = from; j < to; j++ ) {
            if( dir > 0 )
                occupied_up[ j ] += 1;
            else 
                occupied_dw[ j ] += 1;
        }
    }
    for( int i = 0; i < N - 1; i ++ ) {
        points_red += min( occupied_up[ i ], occupied_dw[ i ] );
    }

    // Blu
    for( int i = 0; i < N - 1; i ++ ) {
        occupied_up[ i ] = 0;
        occupied_dw[ i ] = 0;
    }
    for( int i = 0; i < arrows_blu->size(); i++ ) {
        from = arr_from( arrows_blu->at( i ) );
        to   = arr_to  ( arrows_blu->at( i ) );
        dir  = 1;

        if( from > to ) {
            swap( from, to );
            dir *= -1;
        }

        for( int j = from; j < to; j++ ) {
            if( dir > 0 )
                occupied_up[ j ] += 1;
            else 
                occupied_dw[ j ] += 1;
        }
    }
    for( int i = 0; i < N - 1; i ++ ) {
        points_blu += min( occupied_up[ i ], occupied_dw[ i ] );
    }

    if( points_red > points_blu )
        return GameEsit::RedWin;
    if( points_blu > points_red )
        return GameEsit::BluWin;
    return GameEsit::Tie;
}

string GameState::toString() {
    if( count() == 0 )
        return "Nessuna freccia";

    stringstream ss("");
    ss<<"Rosse: ";
    for( int i = 0; i < arrows_red->size(); i++ )
        ss << int( arr_from( arrows_red->at( i ) ) ) << "->" << int( arr_to( arrows_red->at( i ) ) ) << " (" << int( arrows_red->at(i) ) << "); ";
    if( arrows_blu->size() > 0 )
        ss << "Blu: ";
    for( int i = 0; i < arrows_blu->size(); i++ )
        ss << int( arr_from( arrows_blu->at( i ) ) ) << "->" << int( arr_to( arrows_blu->at( i ) ) ) << " (" << int( arrows_blu->at(i) ) << "); ";
    return ss.str();
}

size_t GameStateHasher::maximum = 0;

size_t GameStateHasher::operator() ( const GameState &gs ) const {
    size_t hash = 0;
    for( short i = 0; i < gs.N / 2; i++ ) {
        hash *= gs.N * gs.N;
        if( i < gs.arrows_red->size() )
            hash += gs.arrows_red->at(i);
    }
    for( short i = 0; i < gs.N / 2; i++ ) {
        hash *= gs.N * gs.N;
        if( i < gs.arrows_blu->size() )
            hash += gs.arrows_blu->at(i);
    }
    if( hash > maximum )
        maximum = hash;
    return hash;
}