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
                    <p class="agregarAmigoResultado" style="display: none;"></p>
                    <div class="agregarAmigoDIV" style="display: none;">
                        <label for="hashAmigo">Id de tu amigo:</label>
                        <input type="text" id="hashAmigo" name="hashAmigo" placeholder="#0000">
                        <p class="agregarAmigo boton" style="margin: 0;">Agregar</p>
                    </div>
                </div>
                <div class="listaAmigos"></div>
            </section>
            <section class="texto">
                <div class="headerTexto"></div>
                <div class="mainTexto"></div>
                <div class="footerTexto">
                    <input class="contenidoEnviarMensaje" type="text">
                    <p class="boton enviarMensaje">Enviar</p>
                </div>
            </section>
        </article>
        <article class="eventosPublicos">
            <div class="headerEventosPublicos">
                <div class="addEventoDiv">
                    <label for="idAddEvento">Id del evento:</label>
                    <input type="text" id="idAddEvento" name="idAddEvento" placeholder="#0000">
                    <p class="addEvento boton" style="margin: 0;">Participar</p>
                    <p class="resultadoAddEvento" style="color: red;"></p>
                </div>
                <p class="boton listarEventosPublicos">Lista de eventos publicos</p>
            </div>
            <div class="mainEventosPublicos"></div>
        </article>
        <article class="foros">
            <div class="headerForos">
                <div class="addForoDiv">
                    <label for="idAddForo">Id del foro:</label>
                    <input type="text" id="idAddForo" name="idAddForo" placeholder="#0000">
                    <p class="idAddForo boton" style="margin: 0;">Unirse</p>
                    <p class="resultadoAddForo" style="color: red;"></p>
                </div>
                <p class="boton listarForos">Lista de foros</p>
                <p class="idCrearForo boton" style="margin: 0;">Crear nuevo foro</p>
            </div>
            <div class="mainForo"></div>
        </article>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/portada.js') }}"></script>
</body>

</html>