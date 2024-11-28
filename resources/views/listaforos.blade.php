<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/listaForos.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    <header>
        <h1>LuckyEvents</h1>
    </header>
    <main>
        <article class="ordenYFiltro"></article>
        <article class="todosForos">
        </article>
    </main>
    <footer>
        <h4>comunicacion@luckyevents.com</h4>
        <h4>Terminos y condiciones</h4>
        <h4>Proposito del proyecto</h4>
    </footer>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/listaForos.js') }}"></script>
</body>

</html>