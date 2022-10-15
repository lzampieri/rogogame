<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <title>Strali</title>
    @inertiaHead
    @routes

    <!-- CSRF Token -->
    <script type="text/javascript">const csrf_token = "{{ csrf_token() }}"; </script>

  </head>
  <body>
    @inertia
  </body>
</html>
