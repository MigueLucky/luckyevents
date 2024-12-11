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
    }

    eventosPorUsuario()
    //Crear eventos
    $("html").on('click', '.crearEvento p', function () {
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
                    case "Volver al evento":
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



    //Mostrar eventos
    $("html").on("click", ".evento", async function () {
        let idEvento = $(this).attr("id").replace("evento", "");
        let evento;

        try {
            let response = await fetch(`/eventos/${idEvento}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                evento = await response.json();
                console.log(evento);
                
                $(".contenido").css("background-color", evento.color);
    
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
                                    <p>El evento empieza el ${new Date(evento.fechaHoraInicio).toLocaleString()} y acaba el ${new Date(evento.fechaHoraFin).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p>${evento.privacidad ? "Evento privado" : "Evento público"}${evento.ubicacion ? ` en ${evento.ubicacion}` : ''}</p>
                                </div>
                            </div>
                        </section>
                        <section class="eventoVehiculos"></section>
                        <section class="eventoChat"></section>
                        <section class="eventoLinks"></section>
                        <section class="eventoListaUsu"></section>
                        <div class="xIcon EventoXIcon">&#10006;</div>
                    </div>
                `);

                $(".xIcon").off().on("click", function () {
                    $('.detrasContenido').css('visibility', 'hidden');
                    $('.contenido').html("");
                    $(".contenido").css("background-color", "#D0E7D2")
                });
            } else {
                console.error("Error al obtener el evento:", response.statusText);
            }
        } catch (error) {
            console.error("Hubo un error al comunicarse con el servidor:", error);
        }
    });

    //CHATS
    $(".agregarAmigoP").on("click", function () {
        $(".agregarAmigoDIV").toggle();
    })

    $(".agregarAmigo").on("click", function () {
        $(".agregarAmigoDIV").hide();
        $(".agregarAmigoResultado").show();
        setTimeout(function () {
            $(".agregarAmigoResultado").hide();
        }, 3000);
    })

    async function amigosPorUsuario() {
        try {
            let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            let response = await fetch("/amigosPorUsuario", {
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
    }
    amigosPorUsuario()
});
