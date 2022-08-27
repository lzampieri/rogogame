#ifndef GAMESTATE_H
#define GAMESTATE_H

#include <vector>
#include <algorithm>
#include <stdexcept>
#include <sstream>
#include "GameProps.h"

class GameStateHasher;

class GameState {
    arrow N;
    std::vector<arrow>* arrows_red;
    std::vector<arrow>* arrows_blu;

    short all_arrows_size() const;
    arrow all_arrows_at( const short i ) const;

    inline arrow arr_from( const arrow a ) const { return a % N; };
    inline arrow arr_to( const arrow a ) const { return a / N; };

public:
    GameState( const arrow N );
    GameState( const GameState &old_gs );
    ~GameState();

    bool operator==( const GameState &other ) const;
    GameState& operator+=( const arrow a );
    friend GameState operator+( const GameState& old_gs, const arrow a );

    arrow getN() const { return N; }
    bool ended() const;
    arrow count() const;
    bool drawable( arrow a ) const;
    GamePlayer nextPlayer() const;

    GameEsit winner() const;

    std::string toString();

    friend class GameStateHasher;
};

class GameStateHasher {
public:
    size_t operator() ( const GameState &gs ) const;
};

#endif