<?php
namespace App\Http\Controllers;

use App\Models\Move;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DataInsertionController extends Controller {

    public function datasets( Request $request ) {
        $stay = array_key_exists( 'stay', $request->query() );

        $files_list = Storage::files( 'data' ); # Extract all present files
        $files_list = array_map( function ( $s ) { return substr( $s, 5, -4 ); }, $files_list ); # Remove "data/" and ".csv"
        $files_list = array_filter( $files_list, function ( $s ) { return strpos( $s, 'list' ) !== false; } ); # Filter on only lists
        $files_list = array_values( $files_list ); # Clean array index

        if( count( $files_list ) == 1 && !$stay ) {
            return redirect()->route( 'data_insertion.list', [ 'dataset' => $files_list[0] ] );
        }

        return view( 'datainsertion_datasets', [ 'files_list' => $files_list, 'total' => Move::count() ] );
    }

    public function interface( $dataset ) {
        // Be sure that the file list exists
        if( !Storage::has( "data/" . $dataset . ".csv" ) ) {
            return redirect()->route( 'data_insertion.datasets', 'stay' );
        }

        // Read the list of files
        $file_list = explode( PHP_EOL, Storage::get( "data/" . $dataset . ".csv" ) );
        array_shift( $file_list ); // Remove the first row
        
        $files = [];
        foreach( $file_list as $file ) {
            $file = rtrim( $file );
            if( strlen( $file ) == 0 ) continue;

            [ $filename, $first_id, $last_id ] = explode( ',', $file );
            $first_ok = ( Move::find( $first_id ) == null ? false : true );
            $last_ok  = ( Move::find( $last_id )  == null ? false : true );

            $files[] = [
                'filename' => $filename,
                'first' => $first_ok,
                'last' => $last_ok
            ];
        }

        return view( 'datainsertion', ['files' => $files, 'total' => Move::count(), 'dataset' => $dataset ] );
    }

    public function load( $filename ) {
        // Load a single file
        $data_list = explode( PHP_EOL, Storage::get( 'data/' . $filename ) );
        array_shift( $data_list ); // Remove the first row

        $to_insert = array();

        foreach( $data_list as $data_line ) {
            $data_line = rtrim( $data_line );
            if( strlen( $data_line ) == 0 ) continue;

            $data = explode( ',',  $data_line );

            $to_insert[] = [
                "id" => $data[0],
                "PossibleArrows" => str_replace( ",]", "]", '[' . str_replace( ';', ',', $data[1] ) . ']' ),
                "WinProb" => $data[2],
                "TieProb" => $data[3]
            ];

            if( count( $to_insert ) > 5000 ) {
                DB::table('strali_moves')->insert($to_insert);
                $to_insert = [];
            }

        }

        DB::table('strali_moves')->insert($to_insert);
        return "OK";
    }

    public function truncate() {
        Move::truncate();

        return redirect( route( 'data_insertion.datasets') );
    }

}