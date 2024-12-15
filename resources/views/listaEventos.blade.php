<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/listaEventos.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <main>
        <article class="detrasContenido">
            <section class="contenido"></section>
        </article>
        <article class="ordenYEntrar">
            <div class="addEventoDiv">
                <label for="idAddEvento">Id del evento:</label>
                <input type="text" id="idAddEvento" name="idAddEvento" placeholder="#0000">
                <p class="addEvento boton" style="margin: 0;">Participar</p>
                <p class="resultadoAddEvento" style="color: red;"></p>
            </div>
        </article>
        <article class="todosEventos">
        </article>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/listaEventos.js') }}"></script>
</body>

</html>