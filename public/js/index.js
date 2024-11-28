$(function () {
    const nombresImagenes = [
        "barbacoa.jpg",
        "cumpleanos.jpg",
        "deportes.jpg",
        "examen.jpg",
        "gaming.jpg",
        "gym.jpg",
        "paella.jpg",
        "viajes.jpg"
    ];

    let img1, img2;
    do {
        img1 = Math.floor(Math.random() * 8);
        img2 = Math.floor(Math.random() * 8);
    } while (img1 === img2);

    $(".esquinaIzq > img").attr("src", `/img/index/${nombresImagenes[img1]}`);
    $(".esquinaDer > img").attr("src", `/img/index/${nombresImagenes[img2]}`);    

    $('main').on('mouseenter', '.recuContra', function () {
        $(this).css("color", "#B0D9B1");
    });

    $('main').on('mouseleave', '.recuContra', function () {
        $(this).css("color", "black");
    });

    $('main').on('click', '.botonIni', function () {
        $("main").html("");

        $("main").append("<p>Tus planes están en camino... ¡Esperamos que estés listo!</p>");
        $("main").append("<p class='volverAtras'>↩Volver atras</p>");
        $("main").append("<input class='inputEmail' type='email' placeholder='Correo electrónico'>");
        $("main").append("<input class='inputContrasena' type='password' placeholder='Contraseña'>");
        $("main").append("<p color: red;' class='mensajeError'></p>");
        $("main").append("<p class='boton botonIniciarSesion'>Enviar</p>");

        $(".botonIniciarSesion").off().on("click", function () {
            let email = $(".inputEmail").val();
            let contrasena = $(".inputContrasena").val();

            if (!email) {

            }
            if (!contrasena) {

            }

        })

        posicionElementos()
    })

    $('main').on('click', '.botonReg', function () {
        $("main").html("");

        $("main").append("<p>Comienza a crear y compartir tus mejores planes.</p>");
        $("main").append("<p class='volverAtras'>↩Volver atras</p>");
        $("main").append("<input class='inputNombre' type='text' placeholder='Nombre'>");
        $("main").append("<input class='inputEmail' type='email' placeholder='Correo electrónico'>");
        $("main").append("<input class='inputContrasena' type='password' placeholder='Contraseña'>");
        $("main").append("<p color: red;' class='mensajeError'></p>");
        $("main").append("<p class='boton botonRegistrarse'>Enviar</p>")

        $(".botonRegistrarse").off().on("click", function () {
            let nombre = $(".inputNombre").val();
            let email = $(".inputEmail").val();
            let contrasena = $(".inputContrasena").val();
            let textoError = $("Por favor coloca ");

            if (!nombre) {
                textoError = textoError + "un nombre "
            }
            if (!email) {
                textoError = textoError + "un email "
            }
            if (!contrasena) {
                textoError = textoError + "una contraseña "
            }

        })

        posicionElementos()
    })

    $('main').on('click', '.recuContra', function () {
        $("main").html("");

        $("main").append("<p>Introduce el correo electrónico para restablecer la contraseña:</p>");
        $("main").append("<p class='volverAtras'>↩Volver atras</p>");
        $("main").append("<input type='email' placeholder='Correo electrónico'>");
        $("main").append("<p style='display: none; color: red;' class='mensajeCorreoError'>Por favor, introduce un correo electrónico válido.</p>");
        $("main").append("<p class='boton botonRecuInput'>Enviar</p>")
        $("main").append("<p style='display: none' class='mensajeCorreoBien'>Si el correo electrónico tiene una cuenta asociada, recibiras un email donde podras restablecer tu contraseña.</p>");

        $(".botonRecuInput").off().on("click", function () {
            let email = $("main input").val();

            if (email) {
                $(".mensajeCorreoError").hide();
                $(".mensajeCorreoBien").show();
            } else {
                $(".mensajeCorreoBien").hide();
                $(".mensajeCorreoError").show();
            }
        })

        posicionElementos()
    })

    $('main').on('click', '.volverAtras', function () {
        $("main").html("");

        $("main").append("<p>Ingresa para descubrir y planificar experiencias inolvidables.</p>");
        $("main").append("<div/>");
        $("main div").append("<p class='boton botonIni'>Iniciar sesion</p>");
        $("main div").append('<p class="boton botonReg">Registrarse</p>');
        $("main").append("<p class='recuContra'>¿Olvidaste tu contraseña?</p>");

        posicionElementos()
    })

    function posicionElementos() {
        let altoBody = $('body').height();
        let anchoBody = $('body').width();

        let altoHeader = $('header').height();
        let altoFooter = $('footer').height();

        let altoCentro = ((altoBody - altoHeader - altoFooter) / 2);

        let altoMain = $('main').height();
        let anchoMain = $('main').width();

        let anchoRecuContra = $("main > p:last-of-type").width();

        $("main").css("top", (altoBody / 2 - altoMain / 2));
        $("main").css("left", (anchoBody / 2 - anchoMain / 2));
        $("main > p:last-of-type").css("left", (anchoMain / 2 - anchoRecuContra / 2))

        $(".esquinaIzq div").css({
            "border-left": ((anchoBody / 2) + 10) + "px solid transparent",
            "border-bottom": (altoCentro + 10) + "px solid #D0E7D2",
            "bottom": (altoCentro + 10) + "px"
        })

        $(".esquinaDer").css("left", anchoBody / 2)
        $(".esquinaDer div").css({
            "border-right": ((anchoBody / 2) + 10) + "px solid transparent",
            "border-top": (altoCentro - 10) + "px solid #D0E7D2",
            "bottom": (altoCentro - 10) + "px"
        })
    }

    $(window).off().on('resize', function () {
        posicionElementos();
    })

    posicionElementos();
})