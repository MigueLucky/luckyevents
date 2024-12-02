$(function () {
    if (localStorage.length > 0) {
        if (window.location.href.includes('portada')) {
            $("header").html(
                `<h1>LuckyEvents</h1>
                <div  class="imgUsu">
                    <img>
                    <div class="ajustesUsu">
                        <p class="perfil boton">Perfil</p>
                        <p class="cerrarSesion boton">Cerrar sesión</p>
                    </div>
                </div>`
            );
        } else {
            $("header").html(
                `<h1>LuckyEvents</h1>
                <p class="volverPortada">↩Volver a la portada</p>
                <div class="imgUsu">
                    <img>
                    <div class="ajustesUsu">
                        <p class="perfil boton">Perfil</p>
                        <p class="cerrarSesion boton">Cerrar sesión</p>
                    </div>
                </div>`
            );

            $(".volverPortada").on("click", function () {
                window.location.href = '/portada';
            })

            $(".volverPortada").css({ "cursor": "pointer" })
        }
        $("h1").on("click", function () {
            window.location.href = '/portada';
        })
        $("h1").css({ "cursor": "pointer" })

        let user = localStorage.getItem('user');
        let userObject = JSON.parse(user);

        $(".imgUsu").css({
           
        });

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
            "border-radius": "0 0 25% 25%"
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
            $("header").html(
                `<h1>LuckyEvents</h1>
                <p class="volverIndex">↩Volver al index</p>
                `
            );
            $("h1").on("click", function () {
                window.location.href = '/';
            })
            $("h1").css({ "cursor": "pointer" })

            $(".volverIndex").on("click", function () {
                window.location.href = '/';
            })
            $(".volverIndex").css({ "cursor": "pointer" })
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