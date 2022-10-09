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
            $table->string('redtype', 40);
            $table->string('blutype', 40);
            $table->smallInteger('redpoints')->nullable();
            $table->smallInteger('blupoints')->nullable();
            $table->string('final_state',16);

            $table->foreign('final_state')->references('id')->on('strali_moves');
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
