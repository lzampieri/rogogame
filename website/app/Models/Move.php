<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';

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