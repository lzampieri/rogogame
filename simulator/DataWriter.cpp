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
    (*filelist) << "list\n";

    file_count = 0;

    new_file();

    if( verify )
        set = new unordered_set< size_t, GameStateHasher >();
}

void DataWriter::new_file() {
    file_count += 1;
    string the_file = basename + to_string( file_count ) + ".csv";
    (*filelist) << the_file << '\n';

    if( verbose )
        cout<<the_file<<endl;

    current = new ofstream( the_file );
    (*current) << "GameState,PossibleArrows,WinProb,TieProb\n";

    rows_count = 0;
}

void DataWriter::close_file() {
    current->flush();
    current->close();
    delete current;
}

void DataWriter::write_row(const GameState gs, std::vector<arrow>* possible_arrows, double win_prob, double tie_prob ) {
    if( rows_count >= rows_per_file ) {
        close_file();
        new_file();
    }
    rows_count += 1;

    size_t hash = gsh( gs );

    if( verify ) {
        if( set->count( hash ) > 0 ) {
            throw new invalid_argument( "Hash " + to_string(hash) + " already used!" );
        }
        set->insert( hash );
    }

    (*current) << hash << ",";
    
    for( arrow a : *possible_arrows )
        (*current) << int(a) << ";";

    (*current) << "," << win_prob << "," << tie_prob << "\n";
}

void DataWriter::close() {
    close_file();

    filelist->flush();
    filelist->close();
    delete filelist;
}