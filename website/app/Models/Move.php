<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    protected $table = 'strali_moves';

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

    public function games() {
        return $this->hasMany( Game::class, 'final_state' );
    }

    public function toStringProbs() {
        return $this->id . " (" .
            'win: ' . $this->WinProb .
            ', tie: ' . $this->TieProb .
            ') ';
    }
}