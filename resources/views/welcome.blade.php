<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <div class="esquinaIzq">
        <img>
        <div></div>
    </div>
    <main>
        <p>Ingresa para descubrir y planificar experiencias inolvidables.</p>
        <div>
            <p class="boton botonIni">Iniciar sesion</p>
            <p class="boton botonReg">Registrarse</p>
        </div>
    </main>
    <div class="esquinaDer">
        <img>
        <div></div>
    </div>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/index.js') }}"></script>
</body>

</html>