<?php
 
namespace Database\Seeders;

use App\Models\Move;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MovesSeeder extends Seeder
{
    const basename = 'data/';

    public function run()
    {
        Move::truncate();
        gc_enable();
        ini_set('memory_limit', '0');

        foreach( explode( PHP_EOL, Storage::get( self::basename . "list.csv" ) ) as  $line ) {
            if( $line == "list" ) continue;
            if( strlen( $line ) == 0 ) continue;

            $first_line = false;
            $to_insert = array();

            foreach( explode( PHP_EOL, Storage::get( self::basename . $line ) ) as  $dline ) {
                if( ! $first_line ) {
                    $first_line = true;
                    continue;
                }
                if( strlen( $dline ) == 0 ) continue;

                $data = explode( ',',  $dline );

                $to_insert[] = [
                    "id" => $data[0],
                    "PossibleArrows" => str_replace( ",]", "]", '[' . str_replace( ';', ',', $data[1] ) . ']' ),
                    "WinProb" => $data[2],
                    "TieProb" => $data[3]
                ];

                if( count( $to_insert ) > 5000 ) {
                    DB::table('moves')->insert($to_insert);
                    $to_insert = [];
                }
            }

            DB::table('moves')->insert($to_insert);
            echo $line . "\n";
        }

        echo "Inserited " . Move::count() . " moves";
    }
}