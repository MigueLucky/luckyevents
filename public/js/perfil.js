$(function () {
    let usuarioData = localStorage.getItem("user");
    let usuario = JSON.parse(usuarioData);
    let idUsuario = usuario.id;
    let nombreUsuario = usuario.nombre;
    let apellidoUsuario = usuario.apellido;
    let emailUsuario = usuario.email;
    let fotoUsuario = usuario.foto;
    let leyendaUsuario = usuario.leyenda;
    let ubicacionfavoritaUsuario = usuario.ubicacionFavorita;

    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    //Vehiculos
    async function vehiculosPorUsuario() {
        $(".listaVehiculo").html("");
        try {
            let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            let response = await fetch("/vehiculosPorUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                },
                body: JSON.stringify({
                    idUsuario: idUsuario
                }),
            });

            let semaforo = true;

            if (response.ok) {
                let vehiculos = await response.json();

                vehiculos.forEach(vehiculo => {
                    let vehiculoHtml = `
                            <div class="vehiculo">
                            <img class="imgVehiculoPequeno" src="${vehiculo.foto}">
                            <div class="datosVehiculo">
                                <p>${vehiculo.nombre}</p>
                                <p>${vehiculo.capacidad} asientos</p>
                            </div>
                            <div class="xIcon eliminarVehiculo" id="${vehiculo.id}" style="margin-right: 15px;">&#10006;</div>
                        </div>
                    `;
                    $(".listaVehiculo").append(vehiculoHtml);
                    semaforo = false;
                });
            } else {
                $(".vehiculos").append("<p>No se pudieron cargar los vehículos.</p>");
            }

            if (semaforo) {
                $(".vehiculos").append("<p>No tienes vehículos registrados.</p>");
            }
        } catch (error) {
            $(".vehiculos").append("<p>Hubo un error en la comunicación con el servidor.</p>");
        }

        $(".eliminarVehiculo").off().on("click", async function () {
            let idVehiculo = $(this).attr("id");
        
            try {
                let response = await fetch(`/vehiculos/${idVehiculo}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
        
                if (response.ok) {
                    $(`#${idVehiculo}`).closest('.vehiculo').remove();
                }
            } catch (error) {
                console.error("Hubo un error en la comunicación con el servidor:", error);
            }
        });
    }

    vehiculosPorUsuario();

    $(".anadirVehiculo").off().on("click", function () {
        $(".crearVehiculo > div").toggle();
    })

    async function crearVehiculo() {
        let nombreVehiculo = $("#vehiculoNombre").val();
        let capacidadVehiculo = $("#vehiculoCapacidad").val();
        let foto;
        if ($("#vehiculoFoto")[0].files[0] === undefined || $("#vehiculoFoto")[0].files[0] === null) {
            foto = "img/default/vehiculoDefault.jpg";
        } else {
            foto = $("#vehiculoFoto")[0].files[0];
        }

        let formData = new FormData();

        formData.append("nombre", nombreVehiculo);
        formData.append("capacidad", capacidadVehiculo);
        formData.append("idUsuario", idUsuario);
        formData.append("foto", foto);

        try {
            let response = await fetch("/vehiculos", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: formData
            });

            if (response.ok) {
                vehiculosPorUsuario();
            } else {
                console.error("Error al crear vehículo:", await response.text());
                $(".respuestaVehiculo").text("No se puede crear el vehiculo");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            $(".respuestaVehiculo").text("Ocurrió un error al comunicarse con el servidor, intentalo mas tarde");
        }
    }

    $(".btnVehiculo").off().on("click", function () {
        let nombreVehiculo = $("#vehiculoNombre").val();
        let capacidadVehiculo = $("#vehiculoCapacidad").val();

        let textoError = "Por favor coloca los siguientes apartados: ";
        if (!nombreVehiculo || !capacidadVehiculo) {
            if (!nombreVehiculo) {
                textoError += "nombre ";
            }
            if (!capacidadVehiculo) {
                textoError += "capacidad";
            }
            if(capacidadVehiculo <= 0){
                textoError = "Minimo tiene que tener una plaza";
            }
            $(".respuestaVehiculo").text(textoError);
        } else {
            $(".crearVehiculo > div").hide();
            $(".respuestaVehiculo").text("");
            crearVehiculo()
        }
    })

    $("#vehiculoFoto").on("change", function (e) {
        let file = e.target.files[0];
        let preview = $("#vehiculoPreview");

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
    
    //DatosUsu
    $(".datosUsu > h2").text(nombreUsuario + "#" + idUsuario);

    $("#usuNombre").val(nombreUsuario);
    $("#usuApellido").val(apellidoUsuario);
    $("#usuLeyenda").val(leyendaUsuario);
    $("#usuEmail").val(emailUsuario);
    $("#UsuPreview").html(`<img src="${fotoUsuario}" style="max-width: 100px; max-height: 100px;">`);
    $("#usuUbicacion").val(ubicacionfavoritaUsuario);

    $("#usuFoto").on("change", function (e) {
        let file = e.target.files[0];
        let preview = $("#UsuPreview");

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

    $(".actuContra").off().on("click", function () {
        $(".mostrarActuContra").toggle();
    })

    $(".btnActuContra").off().on("click", function () {
        let antContra = $("#antiguaContra").val();
        let nueContra = $("#nuevaContra").val();

        let textoError = "Por favor coloca los siguientes apartados: ";
        if (!antContra || !nueContra) {
            if (!antContra) {
                textoError += "la antigua contraseña ";
            }
            if (!nueContra) {
                textoError += "la nueva contraseña";
            }
            $(".respuestaContra").text(textoError);
        } else {
            actualizarContrasena();
        }
    });

    $(".actuDatos").off().on("click", function () {
        let nombre = $("#usuNombre").val();
        let email = $("#usuEmail").val();

        let textoError = "Por favor coloca los siguientes apartados: ";
        if (!nombre || !email) {
            if (!nombre) {
                textoError += "nombre ";
            }
            if (!email) {
                textoError += "email";
            }
            $(".respuestaActuDatos").text(textoError);
        } else {
            actualizarDatos();
        }
    });

    async function actualizarContrasena() {
        let antiguaContra = $("#antiguaContra").val();
        let nuevaContra = $("#nuevaContra").val();


        let formData = new FormData();
        formData.append("antiguaContra", antiguaContra);
        formData.append("nuevaContra", nuevaContra);

        try {
            let response = await fetch(`/cambiarContrasena/${idUsuario}`, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            });

            if (response.ok) {
                $(".respuestaContra").text("La contraseña fue actualizada");
            } else {
                $(".respuestaContra").text("La contraseña actual es incorrecta");
            }
        } catch (error) {
            $(".respuestaContra").text("Hubo un error con el servidor, intentalo mas tarde");
        }
    }

    async function actualizarDatos() {
        let nombre = $("#usuNombre").val();
        let apellido = $("#usuApellido").val();
        let leyenda = $("#usuLeyenda").val();
        let email = $("#usuEmail").val();
        let foto;
        if ($("#usuFoto")[0].files[0] === undefined || $("#usuFoto")[0].files[0] === null) {
        } else {
            foto = $("#usuFoto")[0].files[0];
        }

        let ubicacion = $("#usuUbicacion").val();

        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("leyenda", leyenda);
        formData.append("email", email);
        formData.append("ubicacionFavorita", ubicacion);
        formData.append("foto", foto);

        try {
            let response = await fetch(`/update/${idUsuario}`, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                },
            });

            if (response.ok) {
                let result = await response.json();
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(result));

                location.reload();
            } else {
                $(".respuestaActuDatos").text("Error al actualizar datos.");
            }
        } catch (error) {
            $(".respuestaActuDatos").text("Hubo un problema en la conexión.");
            console.error(error);
        }
    }

    //HistorialEventos
    async function eventosPorUsuario() {
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

            let semaforo = true;

            if (response.ok) {
                let eventos = await response.json();

                eventos.forEach(evento => {
                    if (hoy.toISOString() > evento.fechaHoraFin) {
                        let eventoHtml = `
                        <section class="evento" id="evento${evento.id}" style="background-color:${evento.color};">
                            <img class="imgEventoPequeno" src="${evento.foto}">
                            <p>${evento.nombre}</p>
                        </section>
                    `;
                        $(".historial").append(eventoHtml);
                        semaforo = false;
                    }
                });
            } else {
                $(".historial").append("<p>No se pudieron cargar los eventos.</p>");
            }
            if (semaforo) { $(".historial").append("<p>No has participado en ningun evento.</p>"); }
        } catch (error) {
            $(".historial").append("<p>Hubo un error en la comunicación con el servidor.</p>");
        }

        $('.evento').off().on('click', function () {
            $('.detrasContenido').css('visibility', 'visible');
            $('.contenido').html(`
                <div class="tituloContenido">
                    <h2>Creación de eventos:</h2>
                    <div class="xIcon">&#10006;</div>
                </div>
                <div class="contenidoCrearEvento">
                    <div>
                        <label for="nombreEvento">Nombre:</label>
                        <input type="text" id="nombreEvento" name="nombreEvento">
                    </div>
                    <div>
                        <label for="descripcionEvento">Descripción:</label>
                        <input type="text" id="descripcionEvento" name="descripcionEvento">
                    </div>
                    <div>
                        <label for="privacidadEvento">Evento publico:</label>
                        <input type="checkbox" id="privacidadEvento" name="privacidadEvento" style="transform: scale(1.5);">
                    </div>
                    <div>
                        <label for="colorEvento">Color del evento:</label>
                        <input type="color" id="colorEvento" name="colorEvento">
                    </div>
                    <div>
                        <label for="inicioEvento">Fecha y hora de inicio:</label>
                        <input type="datetime-local" id="inicioEvento" name="inicioEvento">
                    </div>
                    <div>
                        <label for="ubicacionEvento">Ubicación:</label>
                        <input type="text" id="ubicacionEvento" name="ubicacionEvento">
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
    
            async function obtenerEventoPorId(idEvento) {
                try {
                    let response = await fetch(`/eventos/${idEvento}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
    
                    if (response.ok) {
                        let eventoHistorial = await response.json();
    
                        $('#nombreEvento').val(eventoHistorial.nombre);
                        $('#descripcionEvento').val(eventoHistorial.descripcion);
                        $("#privacidadEvento").prop('checked', eventoHistorial.privacidad);
                        $('#colorEvento').val(eventoHistorial.color);
                        $('#ubicacionEvento').val(eventoHistorial.ubicacion);
    
                        let preview = $("#preview");
                        preview.html(`<img src="${eventoHistorial.foto}" style="max-width: 100px; max-height: 100px;">`);
    
                        let linksList = $("#linksList");
                        eventoHistorial.links.forEach(linkObj => {
                            linksArray.push({ nombre: linkObj.nombre, link: linkObj.link });
    
                            linksList.append(`
                                <li style="margin: 5px; list-style-type: none;">
                                    <a href="${linkObj.link}" target="_blank">${linkObj.nombre}</a>
                                </li>
                            `);
                        });
                    } else {
                        console.error("Error al obtener el evento:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la comunicación con el servidor:", error);
                }
            }
    
            let idEvento = $(this).attr("id").replace("evento", "");;
    
            obtenerEventoPorId(idEvento);
    
            $("#guardarYSalir").on("click", function () {
                guardarYSalir();
            });
    
            async function guardarYSalir() {
                let nombre = $("#nombreEvento").val();
                let descripcion = $("#descripcionEvento").val();
                let privacidadEvento = $("#privacidadEvento").prop('checked');
                if(privacidadEvento){
                    privacidadEvento = 0;
                }else {
                    privacidadEvento = 1;
                }
                let colorEvento = $("#colorEvento").val();
                let fechaHoraInicio = $("#inicioEvento").val();
                let ubicacionEvento = $("#ubicacionEvento").val();
                let fechaHoraFin = $("#finEvento").val();
    
                let fotoEvento;
                if ($("#fotoEvento")[0].files[0] === undefined || $("#fotoEvento")[0].files[0] === null) {
                    fotoEvento = $("#preview img").attr("src");
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
                            $(".mensajeError3").text("Evento creado correctamente, vuelve a la portada si quieres verlo");
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
        })
    }
    eventosPorUsuario()

})