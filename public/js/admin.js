$(function () {
    // Cargar usuarios con filtros y botones
    async function cargarUsuarios(filtro = 'todos') {
        try {
            let response = await fetch('/users/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            });

            if (response.ok) {
                let usuarios = await response.json();
                let usuariosHTML = '';

                usuarios.forEach(usuario => {
                    if (filtro === 'todos' || (filtro === 'bloqueados' && usuario.bloqueado)) {
                        usuariosHTML += `
                            <div class="usuario" id="usuario${usuario.id}">
                                <p><strong>Id:</strong> ${usuario.id}</p>
                                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                                <p><strong>Email:</strong> ${usuario.email}</p>
                                <p><strong>Estado:</strong> 
                                    <span style="color: ${usuario.bloqueado ? 'red' : ''};">
                                        ${usuario.bloqueado ? 'Bloqueado' : 'Activo'}
                                    </span>
                                </p>
                                <p class="verDatos boton" data-id="${usuario.id}" data-tipo="usuario">Ver todos los datos</p>
                                <p class="bloquear boton" data-id="${usuario.id}" data-bloqueado="${usuario.bloqueado}">
                                    ${usuario.bloqueado ? 'Desbloquear' : 'Bloquear'}
                                </p>
                            </div>
                        `;
                    }
                });

                $('.mainTodosUsuarios').html(usuariosHTML);
                agregarEventosBotones();
            } else {
                console.error("Error al cargar los usuarios:", response.statusText);
                $('.mainTodosUsuarios').html("<p>Error al cargar los usuarios.</p>");
            }
        } catch (error) {
            console.error("Hubo un error al cargar los usuarios:", error);
            $('.mainTodosUsuarios').html("<p>Error al cargar los usuarios.</p>");
        }
    }

    // Cargar eventos con filtros y botones
    async function cargarEventos(filtro = "todos") {
        try {
            let response = await fetch('/eventos/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            });

            if (response.ok) {
                let eventos = await response.json();
                let eventosHTML = '';

                eventos.forEach(evento => {
                    if (filtro === "reportados" && !evento.report) return;

                    eventosHTML += `
                        <div class="evento" id="evento${evento.id}">
                            <p><strong>Id:</strong> ${evento.id}</p>
                            <p><strong>Nombre:</strong> ${evento.nombre}</p>
                            ${evento.report ? `
                                <div style="color: red;">
                                    <p><strong>Reportado:</strong> Sí</p>
                                    <p><strong>Razón del reporte:</strong> ${evento.razonReport || 'No especificada'}</p>
                                </div>
                            ` : `<p><strong>Reportado:</strong> No</p>`}
                            <p class="verDatos boton" data-id="${evento.id}" data-tipo="evento">Ver todos los datos</p>
                            <p class="eliminar boton" data-id="${evento.id}" data-tipo="evento">Eliminar</p>
                            ${evento.report ? `<p class="quitarReporte boton" data-id="${evento.id}" data-tipo="evento">Quitar reporte</p>` : ''}
                        </div>
                    `;
                });

                $('.mainTodosEventos').html(eventosHTML);
                agregarEventosBotones();
            } else {
                console.error("Error al cargar los eventos:", response.statusText);
                $('.mainTodosEventos').html("<p>Error al cargar los eventos.</p>");
            }
        } catch (error) {
            console.error("Hubo un error al cargar los eventos:", error);
            $('.mainTodosEventos').html("<p>Error al cargar los eventos.</p>");
        }
    }

    // Cargar foros con filtros y botones
    async function cargarForos(filtro = "todos") {
        try {
            let response = await fetch('/foros/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            });

            if (response.ok) {
                let foros = await response.json();
                let forosHTML = '';

                foros.forEach(foro => {
                    if (filtro === "reportados" && !foro.report) return;

                    forosHTML += `
                        <div class="foro" id="foro${foro.id}">
                            <p><strong>Id:</strong> ${foro.id}</p>
                            <p><strong>Nombre:</strong> ${foro.nombre}</p>
                            ${foro.report ? `
                                <div style="color: red;">
                                    <p><strong>Reportado:</strong> Sí</p>
                                    <p><strong>Razón del reporte:</strong> ${foro.razonReport || 'No especificada'}</p>
                                </div>
                            ` : `<p><strong>Reportado:</strong> No</p>`}
                            <p class="verDatos boton" data-id="${foro.id}" data-tipo="foro">Ver todos los datos</p>
                            <p class="eliminar boton" data-id="${foro.id}" data-tipo="foro">Eliminar</p>
                            ${foro.report ? `<p class="quitarReporte boton" data-id="${foro.id}" data-tipo="foro">Quitar reporte</p>` : ''}
                        </div>
                    `;
                });

                $('.mainTodosForos').html(forosHTML);
                agregarEventosBotones();
            } else {
                console.error("Error al cargar los foros:", response.statusText);
                $('.mainTodosForos').html("<p>Error al cargar los foros.</p>");
            }
        } catch (error) {
            console.error("Hubo un error al cargar los foros:", error);
            $('.mainTodosForos').html("<p>Error al cargar los foros.</p>");
        }
    }

    // Manejo de botones comunes
    function agregarEventosBotones() {
        $('.verDatos').off().on('click', function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');
        });

        $('.bloquear').off().on('click', function () {
            let id = $(this).data('id');
            let bloqueado = $(this).data('bloqueado');
        });

        $('.eliminar').off().on('click', function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');
        });

        $('.quitarReporte').off().on('click', function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');
        });
    }

    cargarUsuarios();
    cargarEventos();
    cargarForos();

    $('.filtroUsuarios').on('click', function () {
        let filtro = $(this).data('filtro');
        cargarUsuarios(filtro);
    });

    $('.filtroEventos').on('click', function () {
        let filtro = $(this).data('filtro');
        cargarEventos(filtro);
    });

    $('.filtroForos').on('click', function () {
        let filtro = $(this).data('filtro');
        cargarForos(filtro);
    });
});