$(function () {
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