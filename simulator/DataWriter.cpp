#include "DataWriter.h"

using namespace std;

DataWriter::DataWriter( int rows_per_file, bool verbose, bool verify )
    : rows_per_file( rows_per_file ), verbose( verbose ), verify( verify ) {
    basename = "probs_" + date::format("%Y%m%d", chrono::system_clock::now());

    int progressive = 0;
    while( filesystem::exists( basename + "_" + to_string( progressive ) + "_list.csv" ) )
        progressive ++;
    basename += "_" + to_string( progressive ) + "_";

    filelist = new ofstream( basename + "list.csv" );
    (*filelist) << "file,first,last\n";

    file_count = 0;
    rows_count = rows_per_file + 1;

    if( verify )
        set = new unordered_set< size_t, GameStateHasher >();

    last_state_code = "Error";
    current = nullptr;
}

void DataWriter::new_file( std::string first_item_hash ) {
    file_count += 1;
    std::string the_file = basename + to_string( file_count ) + ".csv";
    (*filelist) << the_file << ',' << first_item_hash << ",";

    if( verbose )
        cout<<the_file<<endl;

    current = new ofstream( the_file );
    (*current) << "GameState,PossibleArrows,WinProb,TieProb\n";

    rows_count = 0;
}

void DataWriter::close_file() {
    if( current ) {
        current->flush();
        current->close();
        delete current;

        (*filelist) << last_state_code << '\n';
    }
}

std::string DataWriter::state_code( const GameState gs ) {
    stringstream ss("");

    for( int i = 0; i < gs.N/2; i++ ) {
        if( i < gs.arrows_red->size() ) {
            if( int( gs.arrows_red->at(i) ) < 10 ) ss << "0";
            ss << int( gs.arrows_red->at(i) );
        }
        else ss << "00";
    }
    for( int i = 0; i < gs.N/2; i++ ) {
        if( i < gs.arrows_blu->size() ) {
            if( int( gs.arrows_blu->at(i) ) < 10 ) ss << "0";
            ss << int( gs.arrows_blu->at(i) );
        }
        else ss << "00";
    }

    last_state_code = ss.str();
    return last_state_code;
}

void DataWriter::evolved_write_row(const GameState gs, std::vector<arrow>* possible_arrows, double win_prob, double tie_prob) {
    if( rows_count >= rows_per_file ) {
        close_file();
        new_file( state_code( gs ) );
    }

    (*current) << state_code( gs ) << ',';

    // Print the possible arrows
    for( arrow a : *possible_arrows )
        (*current) << int( a ) << ";";

    (*current) << "," << win_prob << "," << tie_prob << "\n";
    
    rows_count += 1;
}

// void DataWriter::write_row(const GameState gs, std::vector<arrow>* possible_arrows, double win_prob, double tie_prob ) {
//     if( rows_count >= rows_per_file ) {
//         close_file();
//         new_file();
//     }
//     rows_count += 1;

//     size_t hash = gsh( gs );

//     if( verify ) {
//         if( set->count( hash ) > 0 ) {
//             throw new invalid_argument( "Hash " + to_string(hash) + " already used!" );
//         }
//         set->insert( hash );
//     }

//     (*current) << hash << ",";
    
//     for( arrow a : *possible_arrows )
//         (*current) << int(a) << ";";

//     (*current) << "," << win_prob << "," << tie_prob << "\n";
// }

void DataWriter::close() {
    close_file();

    filelist->flush();
    filelist->close();
    delete filelist;
}