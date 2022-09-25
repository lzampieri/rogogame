<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'strali_games';

    protected $fillable = [
        'redtype',
        'blutype',
        'redpoints',
        'blupoints',
        'final_state'
    ];

    public function final_move() {
        return $this->belongsTo( Move::class, 'final_state' );
    }
}
