<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        @routes
    </head>
    <body>
        <h1>Data insertion interface</h1>
        <h4>Sono al momento presenti {{ $total }} righe</h4>
        <a href="#" onClick="truncate()">Truncate</a><br/><br/>

        <b>Scelta del dataset da utilizzare:</b>

        <ul>
        @forelse ($files_list as $row)
            <li><a href="{{ route('data_insertion.list', [ 'dataset' => $row ] ) }}">{{ $row }}</a></li>
        @empty
            Nessun dataset rilevato.
        @endforelse
        </ul>

        <script type="text/javascript">
            function truncate() {
                if( window.confirm('Sicuro? Così svuoterai tutta la tabella.') ) {
                    window.location.href = route( 'data_insertion.truncate' );
                }

            }
        </script>
    </body>
</html>
