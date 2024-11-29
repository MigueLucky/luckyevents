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
        <article class="ordenYFiltro">
            <section class="filtro">
                <div>
                    <label for="gustos">Gusto:</label>
                    <input type="text" name="gustos" id="gustos"></input>
                </div>
                <div>
                    <label for="ubicacion">Ubicacíon:</label>
                    <input type="text" name="ubicacion" id="ubicacion"></input>
                </div>
                <p class="boton">Aplicar filtros</p>
            </section>
            <section class="orden">
                <label for="orden">Ordenar por:</label>
                <select name="orden" id="orden">
                    <option value="fechaInicioAsc">Fecha de Inicio (Más reciente primero)</option>
                    <option value="fechaInicioDesc">Fecha de Inicio (Más antigua primero)</option>
                    <option value="masParticipantes">Cantidad de participantes (Más participantes primero)</option>
                    <option value="menosParticipantes">Cantidad de participantes (Menos participantes primero)</option>
                </select>
            </section>
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