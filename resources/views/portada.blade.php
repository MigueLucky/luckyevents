<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/portada.css') }}">
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
        <article class="tusEventos"></article>
        <article class="chats">
            <section class="amigos">
                <div class="nuevoAmigo">
                    <p class="agregarAmigoP boton">Agregar amigo</p>
                    <p class="agregarAmigoResultado" style="display: none;" >Chat creado correctamente</p>
                    <div class="agregarAmigoDIV" style="display: none;">
                        <label for="hashAmigo">Id de tu amigo:</label>
                        <input type="text" id="hashAmigo" name="hashAmigo" placeholder="#0000">
                        <p class="agregarAmigo boton" style="margin: 0;">Agregar</p>
                    </div>
                </div>
                <div class="listaAmigos">
                </div>
            </section>
            <section class="texto">

            </section>
        </article>
        <article class="eventosPublicos"></article>
        <article class="foros"></article>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/portada.js') }}"></script>
</body>

</html>