$(function () {
    $('html').on('click', 'header h1', function () {
        window.location.href = '/portada';
    });
    
    $('.crearEvento').on('click', function () {
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
                    <label for="privacidadEvento">Evento privado:</label>
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
            <p class="boton" id="guardarYSalir">Guardar y salir</p>
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

        $("#addLink").on("click", function () {
            let name = $("#nombreLink").val().trim();
            let url = $("#urlLink").val().trim();
            let linksList = $("#linksList");

            if (name && url) {
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

        function guardarYSalir() {
            $('#detrasSalirSinGuardar').css('visibility', 'hidden');
            $('.detrasContenido').css('visibility', 'hidden');
            $('.contenido').html("");
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

    $(".evento").on("click", function () {
        $('.detrasContenido').css('visibility', 'visible');
        $('.contenido').html(`
            <div class="tituloContenido">
                <h2>${$(this).attr('id')}</h2>
                <div class="xIcon">&#10006;</div>
            </div> 
        `);

        $(".xIcon").off().on("click", function () {
            $('.detrasContenido').css('visibility', 'hidden');
            $('.contenido').html("");
        });
    });
});
