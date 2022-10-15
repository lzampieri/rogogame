<?php

namespace App\Http\Controllers;
use Ably;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AblyTokenCreator extends Controller {

    public static function getAblyParams() {
        $client_id = AblyTokenCreator::getClientId();
        $token = AblyTokenCreator::getToken( $client_id );
        $username = AblyTokenCreator::getUsername( );

        return [
            'token' => $token,
            'clientId' => $client_id,
            'username' => $username
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
    
    public static function getUsername() {
        if( !session()->has( 'username') ) {
            return "Anonimo";
        }
        return session('username');
    }

    public static function saveUsername( Request $request ) {
        $uname = preg_replace('/[^A-Za-z0-9_\-]/', '', $request->input('username') );
        if( strlen($uname) > 0 ) {
            session(['username' => $uname]);
        }

        return redirect()->route('arena');
    }

    public static function clearClientId() {
        session()->forget( 'clientId' );
    }
}