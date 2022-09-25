<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('strali_games', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('redtype', 16);
            $table->string('blutype', 16);
            $table->smallInteger('redpoints');
            $table->smallInteger('blupoints');
            $table->string('final_state',16);

            $table->foreign('final_state')->references('id')->on('moves');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('strali_games');
    }
}
