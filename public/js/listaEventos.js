$(function(){
    let usuarioData = localStorage.getItem("user");
    let usuario = JSON.parse(usuarioData);
    let idUsuario = usuario.id;

    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    $(".addEvento").off().on("click", async function () {
        let idEventoUnirse = $("#idAddEvento").val().replace("#", "");
        let resultadoAddEvento = $(".resultadoAddEvento");

        if (!idEventoUnirse) {
            resultadoAddEvento.text("Por favor, ingresa un ID válido para el evento.");
        }else{
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

    async function listarTodosLosEventosPublicos() {
        try {
            let response = await fetch('/eventos', {
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
    
                if (eventosHTML) {
                    document.querySelector('.todosEventos').innerHTML = eventosHTML;
                } else {
                    document.querySelector('.todosEventos').innerHTML = "<p>No hay eventos públicos disponibles.</p>";
                }
            } else {
                console.error("Error al listar los eventos:", response.statusText);
                document.querySelector('.todosEventos').innerHTML = "<p>Error al cargar los eventos públicos.</p>";
            }
        } catch (error) {
            console.error("Hubo un error al listar los eventos públicos:", error);
            document.querySelector('.todosEventos').innerHTML = "<p>Error al cargar los eventos públicos.</p>";
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
    
    listarTodosLosEventosPublicos();
})