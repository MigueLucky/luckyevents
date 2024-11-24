<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/portada.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    <header>
        <h1>LuckyEvents</h1>
    </header>
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
        <article class="tusEventos">
            <section class="crearEvento">
                <p>Crear nuevo evento</p>
            </section>
            <section class="evento" id="evento0">
                <img class="imgEventoPequeno" src="img/fotosIndex/barbacoa.jpg">
                <p>evento1</p>
            </section>
            <section class="evento" id="evento1">
                <img class="imgEventoPequeno">
                <p>evento2</p>
            </section>
        </article>
        <article class="chats"></article>
        <article class="eventosPublicos"></article>
        <article class="calendario"></article>
    </main>
    <footer>
        <h4>comunicacion@luckyevents.com</h4>
        <h4>Terminos y condiciones</h4>
        <h4>Proposito del proyecto</h4>
    </footer>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/portada.js') }}"></script>
</body>

</html>