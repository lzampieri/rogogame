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
        È in uso il dataset <b>{{ $dataset }}</b>; <a href="{{ route('data_insertion.datasets', 'stay' ) }}">cambia</a>.<br/><br/>

        <span id="working" style="color: green">&#x25cf;</span> Worker (<span style="color: green">free</span>/<span style="color: red">working</span>)<br />
        <a href="#" onClick="load_all()">Load all</a>     <a href="#" onClick="truncate()">Truncate</a><br/>
        <small>La prima icona rappresenta il primo file della lista, la seconda l'ultimo. Se appaiono casi in cui le due icone sono diverse, è consigliato svuotare completamente il database.</small>
        <h4>Sono al momento presenti {{ $total }} righe</h4>
        @foreach ($files as $row)
            <span id="first_{{ str_replace( '.', '', $row['filename'] ) }}" style="color: {{ $row['first'] ? 'green' : 'red' }}">&#x25cf;</span>
            <span id="last_{{  str_replace( '.', '', $row['filename'] ) }}" style="color: {{ $row['last']  ? 'green' : 'red' }}">&#x25cf;</span>
            {{ $row['filename'] }} 
            @if ( !$row['first'] && !$row['last'] )
                <a href="#" onClick="load('{{ $row['filename'] }}')" id="load_{{  str_replace( '.', '', $row['filename'] ) }}">Load</a>
            @endif
            <br/>
        @endforeach

        <script type="text/javascript">
            async function load( filename ) {
                $('#working').css( 'color', 'red' );
                let api_url = route( 'data_insertion.load', { filename: filename } );
                let response = await $.get( api_url ).fail( error );
                if( response == 'OK' ) {
                    $( '#first_' + filename.replace( '.', '' ) ).css( 'color', 'green' );
                    $( '#last_' +  filename.replace( '.', '' ) ).css( 'color', 'green' );
                    $( '#load_' +  filename.replace( '.', '' ) ).remove();
                    $('#working').css( 'color', 'green' );
                } else {
                    error();
                }
            }
            
            let to_load = [
                @foreach ($files as $row)
                    @if (!$row['first'] && !$row['last'])
                        '{{ $row['filename'] }}',
                    @endif
                @endforeach
            ]

            async function load_all( ) {
                $('#working').css( 'color', 'red' );

                for( let i = 0; i < to_load.length; i++ ) {
                    filename = to_load[i];
                    let api_url = route( 'data_insertion.load', { filename: filename } );
                    let response = await $.get( api_url ).fail( error );
                    if( response == 'OK' ) {
                        $( '#first_' + filename.replace( '.', '' ) ).css( 'color', 'green' );
                        $( '#last_' +  filename.replace( '.', '' ) ).css( 'color', 'green' );
                        $( '#load_' +  filename.replace( '.', '' ) ).remove();
                    } else {
                        error();
                    }
                }
                $('#working').css( 'color', 'green' );
            }

            function error() {
                alert('Qualcosa è andato storto. Meglio ricaricare la pagina.');
                window.location.reload();
            }

            function truncate() {
                if( window.confirm('Sicuro? Così svuoterai tutta la tabella.') ) {
                    window.location.href = route( 'data_insertion.truncate' );
                }

            }
        </script>
    </body>
</html>
