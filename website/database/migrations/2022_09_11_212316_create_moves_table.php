<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovesTable extends Migration
{
    public function up()
    {
        Schema::create('moves', function (Blueprint $table) {
            $table->bigInteger('id');
            $table->text('PossibleArrows');
            $table->double('WinProb');
            $table->double('TieProb');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moves');
    }
}
