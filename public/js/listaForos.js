$(function () {
    let usuarioData = localStorage.getItem("user");
    let usuario = JSON.parse(usuarioData);
    let idUsuario = usuario.id;

    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

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

    async function listarTodosLosForos() {
        try {
            let response = await fetch('/foros', {
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
                    forosHTML += `
                            <div class="foro" id="foro${foro.id}" style="background-color:${foro.color};">
                                <img src="${foro.foto}">
                                <div style="display:flex; flex-direction: column;">
                                    <h3>${foro.nombre}</h3>
                                </div>
                            </div>
                        `;
                });

                if (forosHTML) {
                    document.querySelector('.todosForos').innerHTML = forosHTML;
                } else {
                    document.querySelector('.todosForos').innerHTML = "<p>No hay foros disponibles.</p>";
                }
            } else {
                console.error("Error al listar los foros:", response.statusText);
                document.querySelector('.todosForos').innerHTML = "<p>Error al cargar los foros.</p>";
            }
        } catch (error) {
            console.error("Hubo un error al listar los foros:", error);
            document.querySelector('.todosForos').innerHTML = "<p>Error al cargar los foros.</p>";
        }

        $(".foro").off().on("click", async function () {
            let idForo = $(this).attr("id").replace("foro", "");

            try {

                let responseEvento = await fetch(`/foros/${idForo}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });

                if (responseEvento.ok) {
                    let foro = await responseEvento.json();

                    $('.detrasContenido').css('visibility', 'visible');
                    $('.contenido').css('width', 'auto');
                    $(".contenido").css("background-color", foro.color);
                    $('.contenido').html(`
                        <div style="background-color: #D0E7D2; padding:15px; display:flex; flex-direction:column;">
                            <div class="xIcon xIconEventoPublico">&#10006;</div>
                            <img src="${foro.foto}" style="max-width: 400px; align-self:center"/>
                            <div>
                                <h2 style="text-align:center">${foro.nombre}</h2>
                                <p><strong>Descripción:</strong> ${foro.descripcion ? foro.descripcion : "No tiene descripción"}</p>
                                <p><strong>Ubicación:</strong> ${foro.ubicacion ? foro.ubicacion : "Ubicación no especificada"}</p>
                            </div>
                            <p class="boton unirseForo">Unirse al foro</p>
                        </div>
                    `);

                    $(".xIcon").off().on("click", function () {
                        $('.detrasContenido').css('visibility', 'hidden');
                        $('.contenido').css('width', '90%');
                        $(".contenido").css("background-color", "#D0E7D2");
                        $('.contenido').html("");
                    });

                    $(".unirseForo").off().on("click", async function () {
                        try {
                            let responseUnirse = await fetch(`/participarForo/${idForo}`, {
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
                                console.error("Error al unirse al foro:", responseUnirse.statusText);
                            }
                        } catch (error) {
                            console.error("Hubo un error al unirse al foro:", error);
                        }
                    });

                } else {
                    console.error("Error al obtener los detalles del foro:", responseEvento.statusText);
                    $(".contenido").html("<p>No se pudieron cargar los detalles del foro.</p>");
                }
            } catch (error) {
                console.error("Hubo un error al comunicarse con el servidor:", error);
                $(".contenido").html("<p>Error al cargar los detalles del foro.</p>");
            }
        });
    }

    listarTodosLosForos();
})