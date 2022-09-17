<?php
 
namespace Database\Seeders;

use App\Models\Move;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MovesSeeder extends Seeder
{
    const basename = 'data/';

    public function run()
    {
        Move::truncate();

        foreach( explode( PHP_EOL, Storage::get( self::basename . "list.csv" ) ) as  $line ) {
            if( $line == "list" ) continue;
            if( strlen( $line ) == 0 ) continue;

            $first_line = false;
            foreach( explode( PHP_EOL, Storage::get( self::basename . $line ) ) as  $dline ) {
                if( ! $first_line ) {
                    $first_line = true;
                    continue;
                }
                if( strlen( $dline ) == 0 ) continue;

                $data = explode( ',',  $dline );

                $gamestate = floatval( $data[0] );
                $possible_arrows = array_map('intval', explode(';', $data[1] ) );
                array_pop( $possible_arrows );
                $winprob = floatval( $data[2] );
                $tieprob = floatval( $data[3] );

                Move::create([
                    'id' => $gamestate,
                    'PossibleArrows' => $possible_arrows,
                    'WinProb' => $winprob,
                    'TieProb' => $tieprob
                ]);
            }
        }

        echo "Inserited " . Move::count() . " moves";
    }
}