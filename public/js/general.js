$(function () {
    if (localStorage.length > 0) {
        if (window.location.href.includes('portada')) {
            $("header").html(
                `<h1>LuckyEvents</h1>
                <div>
                    <img class="imgUsu">
                    <div class="ajustesUsu">
                        <p class="perfil boton">Pefil</p>
                        <p class="cerrarSesion boton">Cerrar sesion</p>
                    </div>
                </div>`
            );
        } else {
            $("header").html(
                `<h1>LuckyEvents</h1>
                <p class="volverPortada">↩Volver a la portada</p>
                <div>
                    <img class="imgUsu">
                    <div class="ajustesUsu">
                        <p class="perfil boton">Pefil</p>
                        <p class="cerrarSesion boton">Cerrar sesion</p>
                    </div>
                </div>`
            );
            $(".volverPortada").on("click", function () {
                window.location.href = '/portada';
            })
            $(".volverPortada").css({"cursor": "pointer"})
        }
        $("h1").on("click", function () {
            window.location.href = '/portada';
        })
        $("h1").css({"cursor": "pointer"})

        let user = localStorage.getItem('user');
        let userObject = JSON.parse(user);

        $(".imgUsu").attr("src", userObject.foto);
        $(".imgUsu").css({
            "width": "50px",
            "height": "50px",
            "cursor": "pointer",
            "border-radius": "50%",
            "object-fit": "cover"
        });

        $(".ajustesUsu").hide();

        $(".imgUsu").on("click", function () {
            $(".ajustesUsu").toggle();
        });
        
        $(".perfil").on("click", function(){
            window.location.href = '/perfil';
        })

        $(".cerrarSesion").on("click", function(){
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
    }else{
        if(window.location.href.includes('terminos')){
            $("header").html(
                `<h1>LuckyEvents</h1>
                <p class="volverIndex">↩Volver al index</p>
                `
            );
            $("h1").on("click", function () {
                window.location.href = '/';
            })
            $("h1").css({"cursor": "pointer"})

            $(".volverIndex").on("click", function () {
                window.location.href = '/';
            })
            $(".volverIndex").css({"cursor": "pointer"})
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