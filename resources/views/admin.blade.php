<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <main>
        <div class="detrasContenido">
            <div class="contenido"></div>
        </div>
        <div class="todosUsuarios">
            <div class="headerTodosUsuarios">
                <p class="filtroUsuarios boton" data-filtro="todos">Todos</p>
                <p class="filtroUsuarios boton" data-filtro="bloqueados">Bloqueados</p>
            </div>
            <div class="mainTodosUsuarios"></div>
        </div>
        <div class="todosEventos">
            <div class="headerTodosEventos">
                <p class="filtroEventos boton" data-filtro="todos">Todos</p>
                <p class="filtroEventos boton" data-filtro="reportados">Reportados</p>
            </div>
            <div class="mainTodosEventos"></div>
        </div>

        <div class="todosForos">
            <div class="headerTodosForos">
                <p class="filtroForos boton" data-filtro="todos">Todos</p>
                <p class="filtroForos boton" data-filtro="reportados">Reportados</p>
            </div>
            <div class="mainTodosForos"></div>
        </div>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/admin.js') }}"></script>
</body>

</html>