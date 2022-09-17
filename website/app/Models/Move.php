<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'bigint';

    protected $casts = [
        'PossibleArrows' => 'array'
    ];

    // Fields:
    // id
    // PossibleArrows
    // WinProb
    // TieProb
    // Not mass assignable
}


// $table->id();
// $table->text('PossibleArrows');
// $table->double('WinProb');
// $table->double('TieProb');