<?php

namespace App\Http\Controllers;
use Ably;

class AblyTokenCreator extends Controller {

    public static function getToken() {
        $client = new Ably\AblyRest( env( 'ABLY_API_KEY' ) );
        $tokenDetails = $client->auth->requestToken( );
        return $tokenDetails->token;
    }
}