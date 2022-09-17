#ifndef GAMEMAPPERPROB_H
#define GAMEMAPPERPROB_H

#include <vector>
#include <unordered_map>
#include <iostream>
#include "GameProps.h"
#include "GameState.h"

class GameMapperProb {
public:
    std::unordered_map< GamePlayer, PlayerType >* players;
    std::unordered_map< GameState, GameProbEsit, GameStateHasher >* probs;
    std::unordered_map< GameState, std::vector< arrow >*, GameStateHasher >* possibleMoves;
    std::vector< GameState >* gameStatesList; 
    std::vector< int >* counts;
    int N;

public:
    GameMapperProb( int N, PlayerType redType, PlayerType bluType );
    ~GameMapperProb();

    GameProbEsit& get( const GameState gs );

    GameProbEsit compute( const GameState gs, std::vector<arrow>* possibleInsertions );

private:
    GameProbEsit computeSmart( const GameState gs, std::vector<arrow>* possibleInsertions );
    GameProbEsit computeRand ( const GameState gs, std::vector<arrow>* possibleInsertions );
};

#endif