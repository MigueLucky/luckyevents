$(function () {
    let usuarioData = localStorage.getItem("user");
    let usuario = JSON.parse(usuarioData);
    let idUsuario = usuario.id;

    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    async function eventosPorUsuario() {
        $(".tusEventos").html(`
                <section class="crearEvento">
                    <p class="boton">Crear nuevo evento</p>
                </section>
            `)
        try {
            let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            let response = await fetch("/eventosPorUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                },
                body: JSON.stringify({
                    idUsuario: idUsuario
                }),
            });

            if (response.ok) {
                let eventos = await response.json();

                eventos.forEach(evento => {
                    if (hoy.toISOString() < evento.fechaHoraFin) {
                        let eventoHtml = `
                        <section class="evento" id="evento${evento.id}" style="background-color:${evento.color};">
                            <img class="imgEventoPequeno" src="${evento.foto}">
                            <p>${evento.nombre}</p>
                        </section>
                    `;
                        $(".tusEventos").append(eventoHtml);
                    }
                });
            } else {
                $(".tusEventos").append("<p>No se pudieron cargar los eventos.</p>");
            }
        } catch (error) {
            $(".tusEventos").append("<p>Hubo un error en la comunicación con el servidor.</p>");
        }

        // Mostrar evento
        $(".evento").off().on("click", async function () {
            let idEvento = $(this).attr("id").replace("evento", "");
            let evento;
            let participa = false;

            try {
                let responseEvento = await fetch(`/eventos/${idEvento}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (responseEvento.ok) {
                    evento = await responseEvento.json();

                    $(".contenido").css("background-color", evento.color);

                    // Obtener usuarios del evento
                    let responseUsuarios = await fetch(`/usuariosPorEvento/${idEvento}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        },
                    });

                    let usuariosHTML = '';
                    if (responseUsuarios.ok) {
                        let usuariosEvento = await responseUsuarios.json();
                        if (usuariosEvento.length > 0) {
                            usuariosEvento.forEach(usuarioEvento => {
                                if (usuarioEvento.id === idUsuario) {
                                    participa = true;
                                }
                                usuariosHTML += `
                        <div class="usuario">
                            <img class="imgUsuario" src="${usuarioEvento.foto}">
                            <div>
                                <p>${usuarioEvento.nombre}${usuarioEvento.apellido ? ' ' + usuarioEvento.apellido : ''}</p>
                            </div>
                        </div>
                    `;
                            });
                        } else {
                            usuariosHTML = '<p>No hay usuarios en este evento.</p>';
                        }
                    } else {
                        console.error("Error al obtener los usuarios:", responseUsuarios.statusText);
                    }

                    // Obtener vehículos del evento
                    let responseVehiculos = await fetch(`/vehiculosPorEvento/${idEvento}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        }
                    });

                    let vehiculosHTML = '';
                    if (responseVehiculos.ok) {
                        let vehiculos = await responseVehiculos.json();
                        if (vehiculos.length > 0) {
                            for (let vehiculo of vehiculos) {
                                vehiculosHTML += `
                        <div class="vehiculo">
                            <img class="imgVehiculoPequeno" src="${vehiculo.foto}">
                            <div>
                                <p>${vehiculo.nombre}</p>
                                <p>${vehiculo.capacidad} asientos</p>
                            </div>
                        </div>
                    `;
                            }
                        } else {
                            vehiculosHTML = '<p>No hay vehículos asociados a este evento.</p>';
                        }
                    } else {
                        console.error("Error al obtener los vehículos:", responseVehiculos.statusText);
                        vehiculosHTML = '<p>Error al cargar los vehículos.</p>';
                    }

                    $('.detrasContenido').css('visibility', 'visible');
                    $('.contenido').html(`
                        <div class="contenidoEvento">
                            <section class="eventoInfoGeneral">
                                <img src="${evento.foto}">
                                <div>
                                    <div>
                                        <h2>${evento.nombre}</h2>
                                        ${evento.descripcion ? `<p>${evento.descripcion}</p>` : ''}
                                    </div>
                                    <div>
                                        <p>El evento empieza el ${new Date(evento.fechaHoraInicio).toLocaleString()}${evento.ubicacion ? ` en ${evento.ubicacion}` : ''} y acaba el ${new Date(evento.fechaHoraFin).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p>${evento.privacidad ? "Evento privado" : "Evento público"} y el id del evento es #${idEvento}</p>
                                    </div>
                                </div>
                            </section>
                            <section class="eventoVehiculos">
                                <div>
                                    <p class="boton btnMisVehiculos">Mis vehiculos</p>
                                    <div style="display:none" class="divMisVehiculos"></div>
                                </div>
                                <div class="listaVehiculos">
                                    ${vehiculosHTML}
                                </div>
                            </section>
                            <section class="eventoChat">
                                <div class="mainEventoChat"></div>
                                <div class="footerEventoChat">
                                    <input class="contenidoEnviarMensajeEvento" type="text">
                                    <p class="boton enviarMensajeEvento">Enviar</p>
                                </div>
                            </section>
                            <section class="eventoLinks">
                                ${evento.links && evento.links.length > 0 ? evento.links.map(link => `
                                        <div class="eventoLink">
                                            <a href="${link.link}" target="_blank">${link.nombre}</a>
                                        </div>
                                    `).join('') : '<p>No hay ningún enlace externo</p>'
                        }
                            </section>
                            <section class="eventoListaUsu">
                                ${usuariosHTML}
                            </section>
                            <div class="EventoXIcon">
                                <div>
                                    <p class="reportarEvento">Reportar</p>
                                    <div class="divReportes" style="display: none">
                                        <input type="text" placeholder="Razon del reporte" class="razonReport">
                                        <p class="boton enviarRazonReport">Enviar reporte</p>
                                    </div>
                                </div>
                                <p class="boton entrarAbandonar">${participa ? "Abandonar" : "Participar"}</p>
                                <div class="xIcon">&#10006;</div>
                            </div>
                        </div>
                    `);

                    $(".reportarEvento").off();
                    $(".reportarEvento").on("mouseenter", function () {
                        $(this).css("background-color", "indianred")
                    })

                    $(".reportarEvento").on("mouseleave", function () {
                        $(this).css("background-color", "red")
                    })

                    $(".reportarEvento").on("click", function () {
                        $(".divReportes").toggle();
                    })

                    $(".enviarRazonReport").off().on("click", async function () {
                        let razonReport = $(".razonReport").val().trim();

                        if (razonReport !== "") {
                            try {
                                await fetch(`/reportarEvento/${idEvento}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                                    },
                                    body: JSON.stringify({ razonReport: razonReport }),
                                });

                                $(".divReportes").hide();
                                $(".razonReport").val("")
                            } catch (error) {
                                console.error("Error al enviar el reporte:", error);
                            }
                        }
                    })

                    $(".btnMisVehiculos").off().on("click", async function () {
                        let divMisVehiculos = $(".divMisVehiculos");
                        divMisVehiculos.toggle();

                        if (divMisVehiculos.is(":visible")) {
                            try {
                                let responseVehiculosUsuario = await fetch(`/vehiculosPorUsuario`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({ idUsuario }),
                                });

                                if (responseVehiculosUsuario.ok) {
                                    let vehiculosUsuario = await responseVehiculosUsuario.json();

                                    let responseVehiculosEvento = await fetch(`/vehiculosPorEvento/${idEvento}`, {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                    });

                                    let vehiculosEvento = [];
                                    if (responseVehiculosEvento.ok) {
                                        vehiculosEvento = await responseVehiculosEvento.json();
                                    }

                                    let misVehiculosHTML = vehiculosUsuario.map((vehiculo) => {
                                        let checked = vehiculosEvento.some(
                                            (vehiculoEvento) => vehiculoEvento.id === vehiculo.id
                                        )
                                            ? "checked"
                                            : "";

                                        return `
                                    <div class="vehiculoUsuario">
                                        <input type="checkbox" class="vehiculoCheckbox" style="transform: scale(1.5);" id="vehiculo${vehiculo.id}" ${checked}>
                                        <label for="vehiculo${vehiculo.id}">
                                            ${vehiculo.nombre} (${vehiculo.capacidad} asientos)
                                        </label>
                                    </div>
                                `;
                                    }).join("");

                                    divMisVehiculos.html(misVehiculosHTML);

                                    $(".vehiculoCheckbox").off().on("change", async function () {
                                        let vehiculoId = $(this).attr("id").replace("vehiculo", "");
                                        let checked = $(this).is(":checked");

                                        try {
                                            if (checked) {
                                                let responseAdd = await fetch(`/addVehiculoEvento/${idEvento}`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                    },
                                                    body: JSON.stringify({ idVehiculo: vehiculoId }),
                                                });

                                                if (!responseAdd.ok) {
                                                    console.error("Error al añadir vehículo al evento:", responseAdd.statusText);
                                                }
                                            } else {
                                                let responseRemove = await fetch(`/removeVehiculoEvento/${idEvento}`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                    },
                                                    body: JSON.stringify({ idVehiculo: vehiculoId }),
                                                });

                                                if (!responseRemove.ok) {
                                                    console.error("Error al eliminar vehículo del evento:", responseRemove.statusText);
                                                }
                                            }

                                            // Actualiza la lista de vehículos
                                            await actualizarListaVehiculos(idEvento);
                                        } catch (error) {
                                            console.error("Error al manejar el checkbox del vehículo:", error);
                                        }
                                    });
                                } else {
                                    console.error("Error al obtener los vehículos del usuario:", responseVehiculosUsuario.statusText);
                                }
                            } catch (error) {
                                console.error("Hubo un error al cargar los vehículos:", error);
                            }
                        }
                    });

                    $(".entrarAbandonar").off().on("click", async function () {
                        let accion = $(this).text();
                        try {
                            if (accion === "Participar") {
                                let response = await fetch(`/participarEvento/${idEvento}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({ idUsuario }),
                                });
                                if (response.ok) {
                                    $(this).text("Abandonar");
                                    eventosPorUsuario();
                                }
                            } else if (accion === "Abandonar") {
                                let response = await fetch(`/abandonarEvento/${idEvento}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({ idUsuario }),
                                });
                                if (response.ok) {
                                    $(this).text("Participar");
                                    eventosPorUsuario();
                                }
                            }
                        } catch (error) {
                            console.error("Error en la acción del botón:", error);
                        }
                    });

                    $(".xIcon").off().on("click", function () {
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                        $(".contenido").css("background-color", "#D0E7D2");
                    });

                    $(".enviarMensajeEvento").off().on("click", async function () {
                        let contenidoMensaje = $(".contenidoEnviarMensajeEvento").val();

                        if (contenidoMensaje.trim() !== "") {
                            try {
                                let response = await fetch(`/mensajes/usuario/${idUsuario}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({
                                        contenido: contenidoMensaje,
                                        tipo: "evento",
                                        id_destino: idEvento,
                                    })
                                });

                                if (response.ok) {
                                    let mensaje = await response.json();
                                    $(".contenidoEnviarMensajeEvento").val("");

                                    $(".mainEventoChat").append(`
                                        <p class="mensaje misMensajes">${mensaje.contenido}</p>
                                        `)

                                } else {
                                    console.error("Error al enviar el mensaje:", response.statusText);
                                }
                            } catch (error) {
                                console.error("Error al enviar el mensaje:", error);
                            }
                        }
                    });

                    cargarChatEvento(idEvento);
                } else {
                    console.error("Error al obtener los datos del evento:", responseEvento.statusText);
                }
            } catch (error) {
                console.error("Error al cargar el evento:", error);
            }
        });

        async function actualizarListaVehiculos(idEvento) {
            try {
                let responseVehiculos = await fetch(`/vehiculosPorEvento/${idEvento}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (responseVehiculos.ok) {
                    let vehiculos = await responseVehiculos.json();
                    let vehiculosHTML = '';

                    if (vehiculos.length > 0) {
                        for (let vehiculo of vehiculos) {
                            vehiculosHTML += `
                        <div class="vehiculo">
                            <img class="imgVehiculoPequeno" src="${vehiculo.foto}">
                            <div>
                                <p>${vehiculo.nombre}</p>
                                <p>${vehiculo.capacidad} asientos</p>
                            </div>
                        </div>
                    `;
                        }
                    } else {
                        vehiculosHTML = '<p>No hay vehículos asociados a este evento.</p>';
                    }

                    $(".listaVehiculos").html(vehiculosHTML);
                } else {
                    console.error("Error al obtener los vehículos:", responseVehiculos.statusText);
                    $(".listaVehiculos").html('<p>Error al cargar los vehículos.</p>');
                }
            } catch (error) {
                console.error("Error al actualizar la lista de vehículos:", error);
                $(".listaVehiculos").html('<p>Error al cargar los vehículos.</p>');
            }
        }

        async function cargarChatEvento(idEvento) {
            try {
                let response = await fetch(`/mensajes/evento/${idUsuario}/${idEvento}/evento/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    let mensajes = await response.json();

                    let mensajesHTML = mensajes.map(mensaje => {
                        if (mensaje.id_usuario === idUsuario) {
                            return `
                                <p class="mensaje misMensajes">${mensaje.contenido}</p>
                            `;
                        } else {
                            return `
                                <div class="mensaje susMensajes susMensajesEvento">
                                    <img class="imgAmigoPequeno" src="${mensaje.usuario.foto}" style="width: 50px;">
                                    <div class="infoMensajeEvento">
                                        <p><strong>${mensaje.usuario.nombre} ${mensaje.usuario.apellido ?? ''}</strong></p>
                                        <p class="leyenda">${mensaje.usuario.leyenda ?? ''}</p>
                                        <p class="contenidoMensaje">${mensaje.contenido}</p>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('');

                    $(".mainEventoChat").html(mensajesHTML);

                    let chatContainer = $(".mainEventoChat")[0];
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } else {
                    console.error("Error al obtener los mensajes:", response.statusText);
                }
            } catch (error) {
                console.error("Error al cargar el chat del evento:", error);
            }
        }
    }

    eventosPorUsuario()
    //Crear eventos
    $(".crearEvento p").off().on('click', function () {
        $('.detrasContenido').css('visibility', 'visible');
        $('.contenido').html(`
            <div class="tituloContenido">
                <h2>Creación de eventos:</h2>
                <div class="xIcon">&#10006;</div>
            </div>
            <div class="contenidoCrearEvento">
                <div>
                    <label for="nombreEvento">Nombre:</label>
                    <input type="text" id="nombreEvento" name="nombreEvento" placeholder="Nombre del evento">
                </div>
                <div>
                    <label for="descripcionEvento">Descripción:</label>
                    <input type="text" id="descripcionEvento" name="descripcionEvento" placeholder="Descripción del evento">
                </div>
                <div>
                    <label for="privacidadEvento">Evento publico:</label>
                    <input type="checkbox" id="privacidadEvento" name="privacidadEvento" style="transform: scale(1.5);">
                </div>
                <div>
                    <label for="colorEvento">Color del evento:</label>
                    <input type="color" id="colorEvento" name="colorEvento" value="#618264">
                </div>
                <div>
                    <label for="inicioEvento">Fecha y hora de inicio:</label>
                    <input type="datetime-local" id="inicioEvento" name="inicioEvento">
                </div>
                <div>
                    <label for="ubicacionEvento">Ubicación:</label>
                    <input type="text" id="ubicacionEvento" name="ubicacionEvento" placeholder="Ubicación del evento">
                </div>
                <div>
                    <label for="finEvento">Fecha y hora de fin:</label>
                    <input type="datetime-local" id="finEvento" name="finEvento">
                </div>
                <div style="display:flex; align-items:center;">
                    <label for="fotoEvento">Foto para el evento:</label>
                    <input type="file" id="fotoEvento" accept="image/*" style="width: 45%">
                    <div id="preview"></div>
                </div>
            </div>
            <div>
                <div class="link-container" style="display:flex; align-items: center;">
                    <label for="nombreLink">Nombre del enlace:</label>
                    <input type="text" id="nombreLink" placeholder="LuckyEvents">
                    <label for="urlLink">URL del enlace:</label>
                    <input type="url" id="urlLink" placeholder="https://LuckyEvents.com">
                    <p class="boton" id="addLink" style="margin:0;">Añadir enlace</p>
                    <span class="errorLinkExterno" style="color:red; visibility:hidden;"> Ambos campos son obligatorios.</span>
                </div>
                <div>
                    <p>Lista de Enlaces</p>
                    <ul id="linksList" style="max-height: 70px; overflow-y: auto;width: fit-content; padding: 10px;"></ul>
                </div>
            </div>
            <p class="mensajeError2" style="color:red;"></p>
            <p class="boton" id="guardarYSalir" style="margin: 1% 10% 1% 10%">Guardar y salir</p>
        `);

        $("#fotoEvento").on("change", function (e) {
            let file = e.target.files[0];
            let preview = $("#preview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.html(`<img src="${e.target.result}" style="max-width: 100px; max-height: 100px;">`);
                };
                reader.readAsDataURL(file);
            } else {
                preview.html("");
            }
        });

        let linksArray = [];

        $("#addLink").on("click", function () {
            let name = $("#nombreLink").val().trim();
            let url = $("#urlLink").val().trim();
            let linksList = $("#linksList");

            if (name && url) {
                linksArray.push({ nombre: name, link: url });

                linksList.append(`<li style="margin: 5px; list-style-type: none;"><a href="${url}" target="_blank">${name}</a></li>`);

                $("#nombreLink").val('');
                $("#urlLink").val('');
                $(".errorLinkExterno").css("visibility", "hidden");
            } else {
                $(".errorLinkExterno").css("visibility", "visible");
            }
        });

        $("#guardarYSalir").on("click", function () {
            guardarYSalir();
        });

        async function guardarYSalir() {
            let nombre = $("#nombreEvento").val();
            let descripcion = $("#descripcionEvento").val();
            let privacidadEvento = $("#privacidadEvento").prop('checked');
            if (privacidadEvento) {
                privacidadEvento = 0;
            } else {
                privacidadEvento = 1;
            }
            let colorEvento = $("#colorEvento").val();
            let fechaHoraInicio = $("#inicioEvento").val();
            let ubicacionEvento = $("#ubicacionEvento").val();
            let fechaHoraFin = $("#finEvento").val();
            let fotoEvento;
            if ($("#fotoEvento")[0].files[0] === undefined || $("#fotoEvento")[0].files[0] === null) {
                fotoEvento = "/img/default/eventoDefault.png";
            } else {
                fotoEvento = $("#fotoEvento")[0].files[0];
            }

            let textoError = "Los siguientes apartados son obligatorios: ";

            if (!nombre || !fechaHoraInicio || !fechaHoraFin) {
                if (!nombre) textoError += "nombre del evento ";
                if (!fechaHoraInicio) textoError += "cuando inicia el evento ";
                if (!fechaHoraFin) textoError += "cuando acaba el evento ";

                $(".mensajeError2").text(textoError);
                $('#detrasSalirSinGuardar').css('visibility', 'hidden');
            } else if (hoy.toISOString() > fechaHoraInicio || fechaHoraInicio > fechaHoraFin) {
                if (hoy.toISOString() > fechaHoraInicio) textoError = "La fecha de inicio no puede estar en el pasado";
                if (fechaHoraInicio > fechaHoraFin) textoError = "El evento no puede acabar antes de empezar";

                $(".mensajeError2").text(textoError);
                $('#detrasSalirSinGuardar').css('visibility', 'hidden');
            } else {
                $(".mensajeError2").text("");

                try {
                    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                    let formData = new FormData();
                    formData.append("nombre", nombre);
                    formData.append("privacidad", privacidadEvento);
                    formData.append("fechaHoraInicio", fechaHoraInicio);
                    formData.append("fechaHoraFin", fechaHoraFin);
                    formData.append("foto", fotoEvento);
                    formData.append("descripcion", descripcion);
                    formData.append("ubicacion", ubicacionEvento);
                    formData.append("color", colorEvento);
                    formData.append("links", JSON.stringify(linksArray));

                    let response = await fetch("eventos", {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        },
                        body: formData,
                    });

                    if (response.ok) {
                        eventosPorUsuario();
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                    } else {
                        $(".mensajeError2").text("Error al crear el evento");
                        let responseData = await response.json();
                        $(".mensajeError2").text(responseData.error);
                    }
                } catch (error) {
                    $(".mensajeError2").text("Error al crear el evento, vuelve a intentarlo");
                }
            }
        }

        $(".xIcon").off().on("click", function () {
            $('#detrasSalirSinGuardar').css('visibility', 'visible');

            $('#detrasSalirSinGuardar div p').off().on("click", function () {
                switch ($(this).text()) {
                    case "Volver":
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        break;
                    case "Salir":
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                        break;
                    case "Guardar y salir":
                        guardarYSalir();
                        break;
                }
            });
        });
    });


    //CHATS
    $(".agregarAmigoP").on("click", function () {
        $(".agregarAmigoDIV").toggle();
    })

    $(".agregarAmigo").on("click", async function () {
        let idAmigoAgregar = $("#hashAmigo").val().replace("#", "");

        try {
            let response = await fetch(`/users/${idAmigoAgregar}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (response.ok) {
                $(".agregarAmigoDIV").hide();
                let usuario = await response.json();

                let amigoHtml = `
                <section class="amigo" id="amigo${usuario.id}">
                    <img class="imgAmigoPequeno" src="${usuario.foto}">
                    <p>${usuario.nombre}</p>
                </section>
            `;
                $(".listaAmigos").append(amigoHtml);


                $(".amigo").off().on("click", async function () {
                    let idAmigo = $(this).attr("id").replace("amigo", "");

                    $(".footerTexto").css("display", "flex");
                    $(".headerTexto").html("");
                    $(".mainTexto").html("");
                    try {
                        let response = await fetch(`/users/${idAmigo}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                            },
                        });

                        if (response.ok) {
                            let infoAmigo = await response.json();

                            $(".headerTexto").css("border-bottom", "3px solid #D0E7D2");
                            $(".headerTexto").html(`
                                <img src="${infoAmigo.foto}" class="img-fluid" style="width: 50px; height: 50px; border-radius: 50%;" />
                                <div>
                                    <p>${infoAmigo.nombre} ${infoAmigo.apellido ? infoAmigo.apellido : ""}</p>
                                    <p class="leyenda">${infoAmigo.leyenda ? infoAmigo.leyenda : ""}</p>
                                </div>   
                            `);

                            try {
                                let response = await fetch(`/mensajes/usuario/${idUsuario}/${idAmigo}/usuario`, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                });

                                if (response.ok) {
                                    let mensajes = await response.json();

                                    mensajes.forEach(mensaje => {
                                        let mensajeHTML = `
                                            <p class="${mensaje.id_usuario === idUsuario ? "misMensajes" : "susMensajes"} mensaje">${mensaje.contenido}</p>
                                        `;
                                        $(".mainTexto").append(mensajeHTML);
                                    });
                                } else {
                                    $(".mainTexto").html("<p>No se pudieron cargar los mensajes, intenta más tarde.</p>");
                                }
                            } catch (error) {
                                $(".mainTexto").html("<p>Hubo un problema inesperado, intentalo más tarde.</p>");
                            }

                            $(".enviarMensaje").off().on("click", function () {
                                enviarMensaje(idAmigo);
                            });

                        } else {
                            $(".mainTexto").html("<p>No se pudo encontro a tu amigo, intentalo mas tarde</p>");
                        }
                    } catch (error) {
                        $(".mainTexto").html("<p>Hubo un problema inesperado, intentalo mas tarde</p>");
                    }
                })

                async function enviarMensaje(idAmigo) {
                    let contenido = $(".contenidoEnviarMensaje").val();

                    if (!contenido.trim()) {
                        return;
                    }

                    try {
                        let response = await fetch(`/mensajes/usuario/${idUsuario}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                            },
                            body: JSON.stringify({
                                contenido: contenido,
                                tipo: "usuario",
                                id_destino: idAmigo
                            }),
                        });

                        if (response.ok) {
                            let mensaje = await response.json();

                            let mensajeHTML = `
                                <p class="mensaje misMensajes">${mensaje.contenido}</p>
                            `;

                            $(".mainTexto").append(mensajeHTML);

                            $(".contenidoEnviarMensaje").val("");
                        } else {
                            $(".mainTexto").append("<p>No se pudo enviar el mensaje, intenta más tarde.</p>");
                        }
                    } catch (error) {
                        $(".mainTexto").append("<p>Hubo un problema al enviar el mensaje. Inténtalo más tarde.</p>");
                    }
                }
            } else {
                $(".agregarAmigoResultado").text("El usuario no existe. Por favor, verifica el ID.");
            }
        } catch (error) {
            $(".agregarAmigoResultado").text("Ocurrió un error inesperado. Intenta nuevamente más tarde.");
        }
    });

    async function amigosPorUsuario() {
        $(".listaAmigos").html("");
        try {
            let response = await fetch("/amigosPorUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    idUsuario: idUsuario
                }),
            });

            if (response.ok) {
                let amigos = await response.json();

                if (amigos.length > 0) {
                    $(".listaAmigos").empty();
                    amigos.forEach(amigo => {
                        let amigoHtml = `
                            <section class="amigo" id="amigo${amigo.id}">
                                <img class="imgAmigoPequeno" src="${amigo.foto}">
                                <p>${amigo.nombre}</p>
                            </section>
                        `;
                        $(".listaAmigos").append(amigoHtml);
                    });
                } else {
                    $(".listaAmigos").html("<p>Envia un mensaje a un amigo</p>");
                }
            } else {
                $(".listaAmigos").html("<p>No se pudieron cargar tus amigos.</p>");
            }
        } catch (error) {
            $(".listaAmigos").html("<p>Hubo un error en la comunicación con el servidor.</p>");
        }

        $(".amigo").off().on("click", async function () {
            let idAmigo = $(this).attr("id").replace("amigo", "");

            $(".footerTexto").css("display", "flex");
            $(".headerTexto").html("");
            $(".mainTexto").html("");
            try {
                let response = await fetch(`/users/${idAmigo}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    let infoAmigo = await response.json();

                    $(".headerTexto").css("border-bottom", "3px solid #D0E7D2");
                    $(".headerTexto").html(`
                        <img src="${infoAmigo.foto}" class="img-fluid" style="width: 50px; height: 50px; border-radius: 50%;" />
                        <div>
                            <p>${infoAmigo.nombre} ${infoAmigo.apellido ? infoAmigo.apellido : ""}</p>
                            <p class="leyenda">${infoAmigo.leyenda ? infoAmigo.leyenda : ""}</p>
                        </div>   
                    `);

                    try {
                        let response = await fetch(`/mensajes/usuario/${idUsuario}/${idAmigo}/usuario`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                            },
                        });

                        if (response.ok) {
                            let mensajes = await response.json();

                            mensajes.forEach(mensaje => {
                                let mensajeHTML = `
                                    <p class="${mensaje.id_usuario === idUsuario ? "misMensajes" : "susMensajes"} mensaje">${mensaje.contenido}</p>
                                `;
                                $(".mainTexto").append(mensajeHTML);
                            });
                        } else {
                            $(".mainTexto").html("<p>No se pudieron cargar los mensajes, intenta más tarde.</p>");
                        }
                    } catch (error) {
                        $(".mainTexto").html("<p>Hubo un problema inesperado, intentalo más tarde.</p>");
                    }

                    $(".enviarMensaje").off().on("click", function () {
                        enviarMensaje(idAmigo);
                    });

                } else {
                    $(".mainTexto").html("<p>No se pudo encontro a tu amigo, intentalo mas tarde</p>");
                }
            } catch (error) {
                $(".mainTexto").html("<p>Hubo un problema inesperado, intentalo mas tarde</p>");
            }
        })

        async function enviarMensaje(idAmigo) {
            let contenido = $(".contenidoEnviarMensaje").val();

            if (!contenido.trim()) {
                return;
            }

            try {
                let response = await fetch(`/mensajes/usuario/${idUsuario}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        contenido: contenido,
                        tipo: "usuario",
                        id_destino: idAmigo
                    }),
                });

                if (response.ok) {
                    let mensaje = await response.json();

                    let mensajeHTML = `
                        <p class="mensaje misMensajes">${mensaje.contenido}</p>
                    `;

                    $(".mainTexto").append(mensajeHTML);

                    $(".contenidoEnviarMensaje").val("");
                } else {
                    $(".mainTexto").append("<p>No se pudo enviar el mensaje, intenta más tarde.</p>");
                }
            } catch (error) {
                $(".mainTexto").append("<p>Hubo un problema al enviar el mensaje. Inténtalo más tarde.</p>");
            }
        }
    }
    amigosPorUsuario()


    //Eventos publicos
    let ubicacionFavorita = usuario.ubicacionFavorita;

    $(".listarEventosPublicos").off().on("click", function () {
        window.location.href = '/listaEventos';
    })

    if (!ubicacionFavorita) {
        $(".mainEventosPublicos").html("<p>No tienes una ubicación favorita configurada.</p>");
    } else {
        async function eventosPublicos() {
            try {
                let responseEventos = await fetch(`/eventosPorUbiFavorita`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (responseEventos.ok) {
                    $(".mainEventosPublicos").html("");
                    let eventos = await responseEventos.json();
                    eventos = Object.values(eventos);

                    if (eventos.length > 0) {
                        let eventosHTML = '';
                        eventos.forEach(evento => {
                            if (!evento.privacidad && hoy.toISOString() < evento.fechaHoraFin) {
                                let fechaInicio = new Date(evento.fechaHoraInicio).toLocaleDateString();
                                let fechaFin = new Date(evento.fechaHoraFin).toLocaleDateString();

                                eventosHTML += `
                                <div class="eventoPublico" id="eventoPublico${evento.id}" style="background-color:${evento.color};">
                                    <img class="imgEventoPequeno" src="${evento.foto}">
                                    <div style="display:flex; flex-direction: column;">
                                        <h3>${evento.nombre}</h3>
                                        <p>Empieza el ${fechaInicio} y acaba el ${fechaFin}</p>
                                    </div>
                                </div>
                                `;
                            }
                        });

                        $(".mainEventosPublicos").html(eventosHTML);
                    } else {
                        $(".mainEventosPublicos").html("<p>No hay eventos públicos en tu ubicación favorita en los que no estes unido.</p>");
                    }
                } else {
                    console.error("Error al obtener los eventos públicos:", responseEventos.statusText);
                    $(".mainEventosPublicos").html("<p>Error al cargar los eventos.</p>");
                }
            } catch (error) {
                console.error("Hubo un error al comunicarse con el servidor:", error);
                $(".mainEventosPublicos").html("<p>Error al cargar los eventos.</p>");
            }
            $(".eventoPublico").off().on("click", async function () {
                let idEventoPublico = $(this).attr("id").replace("eventoPublico", "");

                try {

                    let responseEvento = await fetch(`/eventos/${idEventoPublico}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        }
                    });

                    if (responseEvento.ok) {
                        let evento = await responseEvento.json();

                        $('.detrasContenido').css('visibility', 'visible');
                        $('.contenido').css('width', 'auto');
                        $(".contenido").css("background-color", evento.color);
                        $('.contenido').html(`
                            <div style="background-color: #D0E7D2; padding:15px;">
                                <div class="xIcon xIconEventoPublico">&#10006;</div>
                                <img src="${evento.foto}" style="max-width: 400px;"/>
                                <div>
                                    <h2 style="text-align:center">${evento.nombre}</h2>
                                    <p><strong>Descripción:</strong> ${evento.descripcion ? evento.descripcion : "No tiene descripción"}</p>
                                    <p><strong>Ubicación:</strong> ${evento.ubicacion ? evento.ubicacion : "Ubicación no especificada"}</p>
                                    <p><strong>Fecha de inicio:</strong> ${new Date(evento.fechaHoraInicio).toLocaleDateString()}</p>
                                    <p><strong>Fecha de fin:</strong> ${new Date(evento.fechaHoraFin).toLocaleDateString()}</p>
                                </div>
                                <p class="boton unirseEventoPublico">Unirse al evento</p>
                            </div>
                        `);

                        $(".xIcon").off().on("click", function () {
                            $('.detrasContenido').css('visibility', 'hidden');
                            $('.contenido').css('width', '90%');
                            $(".contenido").css("background-color", "#D0E7D2");
                            $('.contenido').html("");
                        });

                        $(".unirseEventoPublico").off().on("click", async function () {
                            try {
                                let responseUnirse = await fetch(`/participarEvento/${idEventoPublico}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({
                                        idUsuario: idUsuario
                                    })
                                });

                                if (responseUnirse.ok) {
                                    $('.detrasContenido').css('visibility', 'hidden');
                                    $('.contenido').css('width', '90%');
                                    $(".contenido").css("background-color", "#D0E7D2");
                                    $('.contenido').html("");

                                    eventosPublicos();
                                    eventosPorUsuario();
                                } else {
                                    $('.detrasContenido').css('visibility', 'hidden');
                                    $('.contenido').css('width', '90%');
                                    $(".contenido").css("background-color", "#D0E7D2");
                                    $('.contenido').html("");
                                    console.error("Error al unirse al evento:", responseUnirse.statusText);
                                }
                            } catch (error) {
                                console.error("Hubo un error al unirse al evento:", error);
                            }
                        });

                    } else {
                        console.error("Error al obtener los detalles del evento:", responseEvento.statusText);
                        $(".contenido").html("<p>No se pudieron cargar los detalles del evento.</p>");
                    }
                } catch (error) {
                    console.error("Hubo un error al comunicarse con el servidor:", error);
                    $(".contenido").html("<p>Error al cargar los detalles del evento.</p>");
                }
            });
        }
        eventosPublicos();
    }

    $(".addEvento").off().on("click", async function () {
        let idEventoUnirse = $("#idAddEvento").val().replace("#", "");
        let resultadoAddEvento = $(".resultadoAddEvento");

        if (!idEventoUnirse) {
            resultadoAddEvento.text("Por favor, ingresa un ID válido para el evento.");
        } else {
            try {
                let response = await fetch(`/eventos/${idEventoUnirse}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (response.ok) {
                    let evento = await response.json();

                    $('.detrasContenido').css('visibility', 'visible');
                    $('.contenido').css('width', 'auto');
                    $(".contenido").css("background-color", evento.color);
                    $('.contenido').html(`
                                <div style="background-color: #D0E7D2; padding:15px;">
                                    <div class="xIcon xIconEventoPublico">&#10006;</div>
                                    <img src="${evento.foto}" style="max-width: 400px;"/>
                                    <div>
                                        <h2 style="text-align:center">${evento.nombre}</h2>
                                        <p><strong>Descripción:</strong> ${evento.descripcion ? evento.descripcion : "No tiene descripción"}</p>
                                        <p><strong>Ubicación:</strong> ${evento.ubicacion ? evento.ubicacion : "Ubicación no especificada"}</p>
                                        <p><strong>Fecha de inicio:</strong> ${new Date(evento.fechaHoraInicio).toLocaleDateString()}</p>
                                        <p><strong>Fecha de fin:</strong> ${new Date(evento.fechaHoraFin).toLocaleDateString()}</p>
                                    </div>
                                    <p class="boton unirseEventoPublico">Unirse al evento</p>
                                </div>
                            `);

                    $(".xIcon").off().on("click", function () {
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').css('width', '90%');
                        $(".contenido").css("background-color", "#D0E7D2");
                        $('.contenido').html("");
                    });

                    $(".unirseEventoPublico").off().on("click", async function () {
                        try {
                            let responseUnirse = await fetch(`/participarEvento/${idEventoUnirse}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                },
                                body: JSON.stringify({
                                    idUsuario: idUsuario
                                })
                            });

                            if (responseUnirse.ok) {
                                $('.detrasContenido').css('visibility', 'hidden');
                                $('.contenido').css('width', '90%');
                                $(".contenido").css("background-color", "#D0E7D2");
                                $('.contenido').html("");

                                eventosPorUsuario();
                            } else {
                                $('.detrasContenido').css('visibility', 'hidden');
                                $('.contenido').css('width', '90%');
                                $(".contenido").css("background-color", "#D0E7D2");
                                $('.contenido').html("");
                                console.error("Error al unirse al evento:", responseUnirse.statusText);
                            }
                        } catch (error) {
                            console.error("Hubo un error al unirse al evento:", error);
                        }
                    });

                } else if (response.status === 404) {
                    resultadoAddEvento.text("El evento no existe. Por favor, verifica la ID ingresada.");
                } else {
                    resultadoAddEvento.text("Hubo un error al verificar el evento. Inténtalo nuevamente.");
                }
            } catch (error) {
                console.error("Error al verificar el evento:", error);
                resultadoAddEvento.text("Error al verificar el evento. Inténtalo más tarde.");
            }
        }
    });

    //Foros
    $(".listarForos").off().on("click", function () {
        window.location.href = '/listaForos';
    })

    $(".addForo").off().on("click", async function () {
        let idForoUnirse = $("#idAddForo").val().replace("#", "");
        let resultadoAddForo = $(".resultadoAddForo");

        if (!idForoUnirse) {
            resultadoAddForo.text("Por favor, ingresa un ID válido para el foro.");
        } else {
            try {
                let response = await fetch(`/foros/${idForoUnirse}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (response.ok) {
                    let foro = await response.json();

                    $('.detrasContenido').css('visibility', 'visible');
                    $('.contenido').css('width', 'auto'); 
                    $(".contenido").css("background-color", foro.color);
                    $('.contenido').html(`
                                <div style="background-color: #D0E7D2; padding:15px; display:flex; flex-direction:column;">
                                    <div class="xIcon xIconForo">&#10006;</div>
                                    <img src="${foro.foto}" style="max-width: 400px; align-self:center"/>
                                    <div>
                                        <h2 style="text-align:center">${foro.nombre}</h2>
                                        <p><strong>Descripción:</strong> ${foro.descripcion ? foro.descripcion : "No tiene descripción"}</p>
                                        <p><strong>Ubicación:</strong> ${foro.ubicacion ? foro.ubicacion : "Ubicación no especificada"}</p>
                                    </div>
                                    <p class="boton unirseEventoPublico">Unirse al foro</p>
                                </div>
                            `);

                    $(".xIcon").off().on("click", function () {
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').css('width', '90%');
                        $(".contenido").css("background-color", "#D0E7D2");
                        $('.contenido').html("");
                    });

                    $(".unirseEventoPublico").off().on("click", async function () {
                        try {
                            let responseUnirse = await fetch(`/participarForo/${idForoUnirse}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                },
                                body: JSON.stringify({
                                    idUsuario: idUsuario
                                })
                            });

                            if (responseUnirse.ok) {
                                $('.detrasContenido').css('visibility', 'hidden');
                                $('.contenido').css('width', '90%');
                                $(".contenido").css("background-color", "#D0E7D2");
                                $('.contenido').html("");

                                forosPorUsuario();
                            } else {
                                $('.detrasContenido').css('visibility', 'hidden');
                                $('.contenido').css('width', '90%');
                                $(".contenido").css("background-color", "#D0E7D2");
                                $('.contenido').html("");
                                console.error("Error al unirse al foro:", responseUnirse.statusText);
                            }
                        } catch (error) {
                            console.error("Hubo un error al unirse al foro:", error);
                        }
                    });

                } else if (response.status === 404) {
                    resultadoAddForo.text("El foro no existe. Por favor, verifica la ID ingresada.");
                } else {
                    resultadoAddForo.text("Hubo un error al verificar el foro. Inténtalo nuevamente.");
                }
            } catch (error) {
                console.error("Error al verificar el evento:", error);
                resultadoAddForo.text("Error al verificar el foro. Inténtalo más tarde.");
            }
        }
    });

    $(".idCrearForo").off().on('click', function () {
        $('.detrasContenido').css('visibility', 'visible');
        $('.contenido').html(`
            <div class="tituloContenido">
                <h2>Creación de foros:</h2>
                <div class="xIcon">&#10006;</div>
            </div>
            <div class="contenidoCrearEvento">
                <div>
                    <label for="nombreForo">Nombre:</label>
                    <input type="text" id="nombreForo" name="nombreForo" placeholder="Nombre del foro">
                </div>
                <div>
                    <label for="descripcionForo">Descripción:</label>
                    <input type="text" id="descripcionForo" name="descripcionForo" placeholder="Descripción del foro">
                </div>
                <div>
                    <label for="colorForo">Color del foro:</label>
                    <input type="color" id="colorForo" name="colorForo" value="#618264">
                </div>
                <div>
                    <label for="ubicacionForo">Ubicación:</label>
                    <input type="text" id="ubicacionForo" name="ubicacionForo" placeholder="Ubicación del foro">
                </div>
                <div style="display:flex; align-items:center;">
                    <label for="fotoForo">Foto para el foro:</label>
                    <input type="file" id="fotoForo" accept="image/*" style="width: 45%">
                    <div id="preview"></div>
                </div>
            </div>
            <p class="mensajeError2" style="color:red;"></p>
            <p class="boton" id="guardarYSalir" style="margin: 1% 10% 1% 10%">Guardar y salir</p>
        `);

        $("#fotoForo").off().on("change", function (e) {
            let file = e.target.files[0];
            let preview = $("#preview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.html(`<img src="${e.target.result}" style="max-width: 100px; max-height: 100px;">`);
                };
                reader.readAsDataURL(file);
            } else {
                preview.html("");
            }
        });

        $("#guardarYSalir").off().on("click", function () {
            guardarYSalir();
        });

        async function guardarYSalir() {
            let nombre = $("#nombreForo").val();
            let descripcion = $("#descripcionForo").val();
            let colorForo = $("#colorForo").val();
            let ubicacionForo = $("#ubicacionForo").val();
            let fotoForo;
            if ($("#fotoForo")[0].files[0] === undefined || $("#fotoForo")[0].files[0] === null) {
                fotoForo = "/img/default/foroDefault.jpg";
            } else {
                fotoForo = $("#fotoForo")[0].files[0];
            }

            if (!nombre) {
                $(".mensajeError2").text("El nombre es obligatorio");
                $('#detrasSalirSinGuardar').css('visibility', 'hidden');
            } else {
                $(".mensajeError2").text("");

                try {
                    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                    let formData = new FormData();
                    formData.append("nombre", nombre);
                    formData.append("foto", fotoForo);
                    formData.append("descripcion", descripcion);
                    formData.append("ubicacion", ubicacionForo);
                    formData.append("color", colorForo);

                    let response = await fetch("foros", {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        },
                        body: formData,
                    });

                    if (response.ok) {
                        forosPorUsuario();
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                    } else {
                        $(".mensajeError2").text("Error al crear el foro");
                        let responseData = await response.json();
                        $(".mensajeError2").text(responseData.error);
                    }
                } catch (error) {
                    $(".mensajeError2").text("Error al crear el evento, vuelve a intentarlo");
                }
            }
        }

        $(".xIcon").off().on("click", function () {
            $('#detrasSalirSinGuardar').css('visibility', 'visible');

            $('#detrasSalirSinGuardar div p').off().on("click", function () {
                switch ($(this).text()) {
                    case "Volver":
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        break;
                    case "Salir":
                        $('#detrasSalirSinGuardar').css('visibility', 'hidden');
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                        break;
                    case "Guardar y salir":
                        guardarYSalir();
                        break;
                }
            });
        });
    });

    async function forosPorUsuario() {
        $(".mainForo").html("");
        try {
            let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            let response = await fetch("/forosPorUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                },
                body: JSON.stringify({
                    idUsuario: idUsuario
                }),
            });

            if (response.ok) {
                let foros = await response.json();

                foros.forEach(foro => {
                    let foroHtml = `
                        <section class="foro" id="foro${foro.id}" style="background-color:${foro.color};">
                            <img class="imgEventoPequeno" src="${foro.foto}">
                            <p>${foro.nombre}</p>
                        </section>
                    `;
                    $(".mainForo").append(foroHtml);
                });
            } else {
                $(".mainForo").append("<p>No se pudieron cargar los foros.</p>");
            }
        } catch (error) {
            $(".mainForo").append("<p>Hubo un error en la comunicación con el servidor.</p>");
        }


        $(".foro").off().on("click", async function () {
            let idForo = $(this).attr("id").replace("foro", "");
            let foro;
            let participa = false;

            try {
                let responseForo = await fetch(`/foros/${idForo}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (responseForo.ok) {
                    foro = await responseForo.json();

                    $(".contenido").css("background-color", foro.color);

                    let responseUsuarios = await fetch(`/usuariosPorForo/${idForo}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        },
                    });

                    let usuariosHTML = '';
                    if (responseUsuarios.ok) {
                        let usuariosForo = await responseUsuarios.json();
                        if (usuariosForo.length > 0) {
                            usuariosForo.forEach(usuarioForo => {
                                if (usuarioForo.id === idUsuario) {
                                    participa = true;
                                }
                                usuariosHTML += `
                        <div class="usuario">
                            <img class="imgUsuario" src="${usuarioForo.foto}">
                            <div>
                                <p>${usuarioForo.nombre}${usuarioForo.apellido ? ' ' + usuarioForo.apellido : ''}</p>
                            </div>
                        </div>
                    `;
                            });
                        } else {
                            usuariosHTML = '<p>No hay usuarios en este evento.</p>';
                        }
                    } else {
                        console.error("Error al obtener los usuarios:", responseUsuarios.statusText);
                    }

                    $('.detrasContenido').css('visibility', 'visible');
                    $('.contenido').html(`
                        <div class="contenidoEvento">
                            <section class="eventoInfoGeneral">
                                <img src="${foro.foto}">
                                <div>
                                    <div>
                                        <h2>${foro.nombre}</h2>
                                        ${foro.descripcion ? `<p>${foro.descripcion}</p>` : ''}
                                    </div>
                                    <div>
                                        <p>${foro.ubicacion ? ` Foros de eventos en ${foro.ubicacion}` : ''}</p>
                                    </div>
                                    <div>
                                        <p>El id del foro es #${idForo}</p>
                                    </div>
                                </div>
                            </section>
                            <section class="eventoChat foroChat">
                                <div class="mainEventoChat"></div>
                                <div class="footerEventoChat">
                                    <input class="contenidoEnviarMensajeEvento" type="text">
                                    <p class="boton enviarMensajeEvento">Enviar</p>
                                </div>
                            </section>
                            <section class="eventoListaUsu foroListaUsu">
                                ${usuariosHTML}
                            </section>
                            <div class="EventoXIcon">
                                <div>
                                    <p class="reportarEvento">Reportar</p>
                                    <div class="divReportes" style="display: none">
                                        <input type="text" placeholder="Razon del reporte" class="razonReport">
                                        <p class="boton enviarRazonReport">Enviar reporte</p>
                                    </div>
                                </div>
                                <p class="boton entrarAbandonar">${participa ? "Abandonar" : "Participar"}</p>
                                <div class="xIcon">&#10006;</div>
                            </div>
                        </div>
                    `);

                    $(".reportarEvento").off();
                    $(".reportarEvento").on("mouseenter", function () {
                        $(this).css("background-color", "indianred")
                    })

                    $(".reportarEvento").on("mouseleave", function () {
                        $(this).css("background-color", "red")
                    })

                    $(".reportarEvento").on("click", function () {
                        $(".divReportes").toggle();
                    })

                    $(".enviarRazonReport").off().on("click", async function () {
                        let razonReport = $(".razonReport").val().trim();

                        if (razonReport !== "") {
                            try {
                                await fetch(`/reportarForo/${idForo}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                                    },
                                    body: JSON.stringify({ razonReport: razonReport }),
                                });

                                $(".divReportes").hide();
                                $(".razonReport").val("")
                            } catch (error) {
                                console.error("Error al enviar el reporte:", error);
                            }
                        }
                    })

                    $(".entrarAbandonar").off().on("click", async function () {
                        let accion = $(this).text();
                        try {
                            if (accion === "Participar") {
                                let response = await fetch(`/participarForo/${idForo}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({ idUsuario }),
                                });
                                if (response.ok) {
                                    $(this).text("Abandonar");
                                    forosPorUsuario();
                                }
                            } else if (accion === "Abandonar") {
                                let response = await fetch(`/abandonarForo/${idForo}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({ idUsuario }),
                                });
                                if (response.ok) {
                                    $(this).text("Participar");
                                    forosPorUsuario();
                                }
                            }
                        } catch (error) {
                            console.error("Error en la acción del botón:", error);
                        }
                    });

                    $(".xIcon").off().on("click", function () {
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').html("");
                        $(".contenido").css("background-color", "#D0E7D2");
                    });

                    $(".enviarMensajeEvento").off().on("click", async function () {
                        let contenidoMensaje = $(".contenidoEnviarMensajeEvento").val();

                        if (contenidoMensaje.trim() !== "") {
                            try {
                                let response = await fetch(`/mensajes/usuario/${idUsuario}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    body: JSON.stringify({
                                        contenido: contenidoMensaje,
                                        tipo: "foro",
                                        id_destino: idForo,
                                    })
                                });

                                if (response.ok) {
                                    let mensaje = await response.json();
                                    $(".contenidoEnviarMensajeEvento").val("");

                                    $(".mainEventoChat").append(`
                                        <p class="mensaje misMensajes">${mensaje.contenido}</p>
                                        `)

                                } else {
                                    console.error("Error al enviar el mensaje:", response.statusText);
                                }
                            } catch (error) {
                                console.error("Error al enviar el mensaje:", error);
                            }
                        }
                    });

                    cargarChatEvento(idForo);
                } else {
                    console.error("Error al obtener los datos del evento:", responseEvento.statusText);
                }
            } catch (error) {
                console.error("Error al cargar el evento:", error);
            }
        });

        async function cargarChatEvento(idForo) {
            try {
                let response = await fetch(`/mensajes/evento/${idUsuario}/${idForo}/foro/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    let mensajes = await response.json();

                    let mensajesHTML = mensajes.map(mensaje => {
                        if (mensaje.id_usuario === idUsuario) {
                            return `
                                <p class="mensaje misMensajes">${mensaje.contenido}</p>
                            `;
                        } else {
                            return `
                                <div class="mensaje susMensajes susMensajesEvento">
                                    <img class="imgAmigoPequeno" src="${mensaje.usuario.foto}" style="width: 50px;">
                                    <div class="infoMensajeEvento">
                                        <p><strong>${mensaje.usuario.nombre} ${mensaje.usuario.apellido ?? ''}</strong></p>
                                        <p class="leyenda">${mensaje.usuario.leyenda ?? ''}</p>
                                        <p class="contenidoMensaje">${mensaje.contenido}</p>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('');

                    $(".mainEventoChat").html(mensajesHTML);

                    let chatContainer = $(".mainEventoChat")[0];
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } else {
                    console.error("Error al obtener los mensajes:", response.statusText);
                }
            } catch (error) {
                console.error("Error al cargar el chat del evento:", error);
            }
        }
    }
    forosPorUsuario()
});
