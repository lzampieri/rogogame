<?php

namespace App\Http\Controllers;
use Ably;
use Illuminate\Support\Str;

class AblyTokenCreator extends Controller {

    public static function getAblyParams() {
        $client_id = AblyTokenCreator::getClientId();
        $token = AblyTokenCreator::getToken( $client_id );

        return [
            'token' => $token,
            'clientId' => $client_id
        ];
    }

    public static function getToken( $client_id ) {
        $client = new Ably\AblyRest( env( 'ABLY_API_KEY' ) );
        $tokenDetails = $client->auth->requestToken( ['clientId' => $client_id ] );
        return $tokenDetails->token;
    }

    public static function getClientId() {
        if( !session()->has( 'clientId') ) {
            $new_id = "" . Str::orderedUuid();
            session( ['clientId' => $new_id ] );
            return $new_id;
        }
        return session('clientId');
    }

    public static function clearClientId() {
        session()->forget( 'clientId' );
    }
}