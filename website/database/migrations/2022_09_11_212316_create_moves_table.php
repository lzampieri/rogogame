<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovesTable extends Migration
{
    public function up()
    {
        Schema::create('strali_moves', function (Blueprint $table) {
            $table->string('id',16)->primary()->index();
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
        Schema::dropIfExists('strali_moves');
    }
}
