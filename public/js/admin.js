$(function () {
    // Cargar usuarios con filtros y botones
    async function cargarUsuarios(filtro = 'todos') {
        $('.mainTodosUsuarios').html("");
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
                                <p class="verDatos boton" data-id="${usuario.id}" data-tipo="users">Ver todos los datos</p>
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
        $('.mainTodosEventos').html("");
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
                            <p class="verDatos boton" data-id="${evento.id}" data-tipo="eventos">Ver todos los datos</p>
                            <p class="eliminar boton" data-id="${evento.id}" data-tipo="eventos">Eliminar</p>
                            ${evento.report ? `<p class="quitarReporte boton" data-id="${evento.id}" data-tipo="eventos">Quitar reporte</p>` : ''}
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
        $('.mainTodosForos').html("");
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
                            <p class="verDatos boton" data-id="${foro.id}" data-tipo="foros">Ver todos los datos</p>
                            <p class="eliminar boton" data-id="${foro.id}" data-tipo="foros">Eliminar</p>
                            ${foro.report ? `<p class="quitarReporte boton" data-id="${foro.id}" data-tipo="foros">Quitar reporte</p>` : ''}
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

    function agregarEventosBotones() {
        $('.verDatos').off().on('click', function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');

            cargarDatosDetalle(id, tipo);
        });

        $('.bloquear').off().on('click', async function () {
            let id = $(this).data('id');
            let bloqueado = $(this).data('bloqueado');

            try {
                let url = `/users/${id}/bloquear`;
                let method = bloqueado ? 'PATCH' : 'PUT';

                let response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    cargarUsuarios();
                } else {
                    console.error(`Error al ${bloqueado ? 'desbloquear' : 'bloquear'} el usuario:`, response.statusText);
                }
            } catch (error) {
                console.error("Error al cambiar estado:", error);
            }
        });

        $('.eliminar').off().on('click', async function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');

            try {
                let url = `/${tipo}/${id}`;
                let response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    if (tipo === "eventos") {
                        cargarEventos();
                    } else if (tipo === "foros") {
                        cargarForos();
                    }
                } else {
                    console.error(`Error al eliminar el ${tipo}:`, response.statusText);
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        });

        $('.quitarReporte').off().on('click', async function () {
            let id = $(this).data('id');
            let tipo = $(this).data('tipo');

            try {
                let url = `/${tipo}/${id}/quitarReporte`;  // Ruta para quitar el reporte
                let response = await fetch(url, {
                    method: 'PATCH', // Usamos PATCH para quitar el reporte
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    // Recargamos los eventos o foros según el tipo
                    if (tipo === 'eventos') {
                        cargarEventos();
                    } else if (tipo === 'foros') {
                        cargarForos();
                    }
                } else {
                    console.error(`Error al quitar reporte de ${tipo}:`, response.statusText);
                }
            } catch (error) {
                console.error("Error al quitar reporte:", error);
            }
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

    async function cargarDatosDetalle(id, tipo) {
        try {
            let url = `/${tipo}/${id}`;
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (response.ok) {
                let datos = await response.json();

                mostrarDetalle(datos, tipo);
            } else {
                console.error("Error al cargar los datos:", response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error al cargar los datos:", error);
        }
    }

    function mostrarDetalle(datos, tipo) {
        let detalleHTML = `<h3>Detalles del ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>`;
        detalleHTML += `<div class="xIcon xIconEventoPublico">&#10006;</div>`;
        // Filtro de campos no deseados
        const camposOcultos = ['email_verified_at', 'created_at', 'updated_at'];

        $('.detrasContenido').css('visibility', 'visible');
        Object.keys(datos).forEach((key) => {
            if (!camposOcultos.includes(key.toLowerCase())) {
                if (key.toLowerCase() === 'foto') {
                    // Mostrar la foto como imagen
                    detalleHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong></p>`;
                    detalleHTML += `<img src="${datos[key]}" alt="Foto de ${tipo}" style="max-width: 300px; height: auto;">`;
                } else if (key.toLowerCase() === 'links') {
                    // Procesar links como un listado
                    let links;
                    if (typeof datos[key] === 'string') {
                        // Si es una cadena, parsear como JSON
                        links = JSON.parse(datos[key]);
                    } else if (Array.isArray(datos[key])) {
                        // Si ya es un arreglo, usarlo directamente
                        links = datos[key];
                    } else {
                        links = []; // Si no cumple con ninguno, considerar vacío
                    }

                    detalleHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong></p><ul>`;
                    links.forEach(linkObj => {
                        detalleHTML += `
                            <li>
                                <a href="${linkObj.link}" target="_blank" rel="noopener noreferrer">
                                    ${linkObj.nombre}
                                </a>
                            </li>`;
                    });
                    detalleHTML += `</ul>`;
                } else {
                    // Mostrar texto normal para otros campos
                    detalleHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${datos[key]}</p>`;
                }
            }
        });

        $(".contenido").html(detalleHTML);

        $(".xIcon").off().on("click", function () {
            $('.detrasContenido').css('visibility', 'hidden');
            $(".contenido").html("");
        })
    }
});