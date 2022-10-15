<html>
    <head>

    </head>
    <body>
        <ul>
            <li><a href="{{ route('data_insertion.datasets' ) }}">Data insertion</a></li>
            <li><a href="{{ route('migrate' ) }}">Migrate database</a></li>
            <li><a href="{{ route('clear_cache' ) }}">Clear artisan cache</a></li>
            <li><a href="{{ route('get_ably_params' ) }}">Get ably params</a></li>
            <li><a href="{{ route('get_client_id' ) }}">Get Ably Client ID</a></li>
            <li><a href="{{ route('clear_client_id' ) }}">Reset Ably Client ID</a></li>
    </body>
</html>