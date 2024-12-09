<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/perfil.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <main>
        <article class="detrasContenido">
            <section id="detrasSalirSinGuardar">
                <div id="salirSinGuardar">
                    <h3>No has terminado el evento ¿seguro que quieres salir?</h3>
                    <div>
                        <p class="boton">Volver al evento</p>
                        <p class="boton">Salir</p>
                        <p class="boton">Guardar y salir</p>
                    </div>
                </div>
            </section>
            <section class="contenido"></section>
        </article>
        <article class="vehiculos">
            <h2>Vehiculos</h2>
        </article>
        <article class="datosUsu"></article>
        <article class="historialEventos">
            <h2>Historial de tus eventos</h2>
            <p class="mensajeError2"></p>
            <section class="historial"></section>
        </article>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/perfil.js') }}"></script>
</body>

</html>