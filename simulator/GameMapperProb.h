#ifndef GAMEMAPPERPROB_H
#define GAMEMAPPERPROB_H

#include <vector>
#include <unordered_map>
#include <iostream>
#include "GameProps.h"
#include "GameState.h"

class GameMapperProb {
    std::unordered_map< GamePlayer, PlayerType >* players;
    std::unordered_map< GameState, GameProbEsit, GameStateHasher >* probs;
    std::vector< int >* counts;
    int N;

public:
    GameMapperProb( int N, PlayerType redType, PlayerType bluType );
    ~GameMapperProb();

    GameProbEsit get( const GameState gs );

    GameProbEsit compute( const GameState gs );

private:
    GameProbEsit computeSmart( const GameState gs );
    GameProbEsit computeRand ( const GameState gs );
};

#endif