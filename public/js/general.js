$(function () {
    if (localStorage.length > 0) {
        let user = localStorage.getItem('user');
        let userObject = JSON.parse(user);

        if (window.location.href.includes('portada')) {
            $(".imgUsu").show();
            $(".volverPortada").show();
            $(".volverPortada").html("");

            if(userObject.admin){
                $(".volverPortada").text("Zona de administracion");
            }
            $(".volverPortada").css({ "cursor": "pointer" })

            $(".volverPortada").off().on("click", function () {
                window.location.href = '/admin';
            })
        } else {
            $(".imgUsu").show();
            $(".volverPortada").show();

            $(".volverPortada").off().on("click", function () {
                window.location.href = '/portada';
            })

            $(".volverPortada").css({ "cursor": "pointer" })
        }

        $("h1").off().on("click", function () {
            window.location.href = '/portada';
        })
        $("h1").css({ "cursor": "pointer" })

        $(".imgUsu img").attr("src", userObject.foto);
        $(".imgUsu img").css({
            "width": "50px",
            "height": "50px",
            "cursor": "pointer",
            "border-radius": "50%",
            "object-fit": "cover"
        });

        $(".ajustesUsu").css({
            "background-color": "#D0E7D2",
            "padding": "10px",
            "position": "absolute",
            "border-radius": "0 0 25% 25%",
            "transform": "translateX(-25%)"
        });

        $(".ajustesUsu").hide();

        $(".imgUsu img").on("click", function () {
            $(".ajustesUsu").toggle();
        });

        $(".perfil").on("click", function () {
            window.location.href = '/perfil';
        })

        $(".cerrarSesion").on("click", function () {
            logout()
        })

        async function logout() {
            try {
                let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                let response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                });

                if (response.ok) {
                    localStorage.clear();
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Hubo un error al intentar cerrar sesión:', error);
            }
        }
    } else {
        if (window.location.href.includes('terminos')) {
            $(".volverPortada").show();
            $(".volverPortada").text("↩Volver al inicio");
            $(".imgUsu").show();
            $(".imgUsu").html("");

            $("h1").off().on("click", function () {
                window.location.href = '/';
            })
            $("h1").css({ "cursor": "pointer" })

            $(".volverPortada").off().on("click", function () {
                window.location.href = '/';
            })
            $(".volverPortada").css({ "cursor": "pointer" })
        }else{
            $("h1").css({
                "position": "unset"
            })
            $(".headerSinH1").hide();
        }
    }

    $('html').on('mouseenter', '.boton', function () {
        $(this).css("background-color", "#B0D9B1");
    });

    $('html').on('mouseleave', '.boton', function () {
        $(this).css("background-color", "#618264");
    });

    $("html").on("click", "footer h4", function () {
        window.location.href = '/terminos';
    });
})