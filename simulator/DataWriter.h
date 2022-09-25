#ifndef DATAWRITER_H
#define DATAWRITER_H

#include <cstdlib>
#include <iostream>
#include <string>
#include <filesystem>
#include <fstream>
#include <unordered_set>
#include <stdexcept>
#include <sstream>
#include "date.h"
#include "GameState.h"
#include "GameMapperProb.h"

class DataWriter {
    std::string basename;
    std::ofstream* filelist;
    std::ofstream* current;
    std::unordered_set< size_t, GameStateHasher >* set;

    GameStateHasher gsh;

    int file_count;
    int rows_count;
    int rows_per_file;
    bool verbose;
    bool verify;
    std::string last_state_code;

    void close_file();
    void new_file( std::string last_item_hash );

public:
    DataWriter( int rows_per_file = 50000, bool verbose = true, bool verify = false );

    std::string state_code( const GameState gs);
    void evolved_write_row(const GameState gs, std::vector<arrow>* possible_arrows, double win_prob, double tie_prob);
    // void write_row(const GameState gs, std::vector<arrow>* possible_arrows, double win_prob, double tie_prob );

    void close();
};

#endif