<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/terminosYPropositos.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <main>
        <div>
            <div class="terminos">
                <h2>Terminos y condiciones</h2>
            </div>
            <div class="propositos">
                <h2>Proposito del proyecto</h2>
            </div>
        </div>
        <div class="texto">
            <b>1. Aceptación de los Términos</b><br>
            Al acceder o utilizar los servicios de LuckyEvents, usted acepta estar vinculado por estos Términos y Condiciones. Si no está de acuerdo con cualquiera de estos términos, no deberá utilizar nuestros servicios.<br><br>

            <b>2. Limitación de Responsabilidad</b><br>
            <b>2.1 Comunicaciones entre Usuarios</b><br>
            LuckyEvents no se hace responsable de las comunicaciones entre los usuarios, ya sean en grupo o privadas. Usted reconoce que todas las interacciones y comunicaciones que realice a través de nuestra plataforma son bajo su propia responsabilidad.<br><br>

            <b>2.2 Realización de los Eventos</b><br>
            LuckyEvents no garantiza que los eventos creados a través de nuestra plataforma se llevarán a cabo según lo planeado. No asumimos ninguna responsabilidad por la veracidad, validez o realización efectiva de los eventos organizados por los usuarios.<br><br>

            <b>2.3 Eventos y Consecuencias</b><br>
            No somos responsables de lo que ocurra durante los eventos organizados a través de nuestra plataforma, ni de cualquier consecuencia derivada de la participación en dichos eventos.<br><br>

            <b>3. Seguridad y Privacidad</b><br>
            <b>3.1 Datos Sensibles</b><br>
            Recomendamos encarecidamente no compartir ningún dato sensible a través de nuestra plataforma, incluyendo, entre otros, números de teléfono, direcciones o datos de tarjetas de crédito. Los usuarios deben actuar con precaución y discernimiento al compartir cualquier tipo de información personal.<br><br>

            <b>3.2 Solicitudes de Información por parte del Equipo de LuckyEvents</b><br>
            Ningún miembro del equipo de LuckyEvents le pedirá nunca su contraseña o cualquier dato sensible. Si recibe una solicitud de este tipo, le aconsejamos que no comparta dicha información y que informe de inmediato a nuestro equipo de soporte.<br><br>

            <b>4. Uso de Contenido y Propiedad Intelectual</b><br>
            <b>4.1 Contenido Libre de Derechos de Autor</b><br>
            Todo el contenido disponible en LuckyEvents se ofrece bajo una licencia abierta que permite su uso, modificación y redistribución, siempre y cuando se cumplan las directrices establecidas por la plataforma.<br><br>

            <b>4.2 Licencia con Aprobación Previa</b><br>
            Aunque se fomenta el uso abierto del contenido, ciertas actividades específicas, como la reventa, la publicación en plataformas comerciales o la modificación significativa del contenido, requieren la aprobación previa por escrito de LuckyEvents. Para solicitar dicha aprobación, los usuarios deben ponerse en contacto con nosotros a través de correo electrónico: licencia@luckyevents.com.<br><br>

            <b>4.3 Contenido de Usuarios</b><br>
            Al publicar contenido en LuckyEvents, los usuarios aceptan que su contenido se comparte bajo una licencia abierta, pero también reconocen que LuckyEvents se reserva el derecho de aprobar o rechazar la publicación de dicho contenido si no cumple con nuestras políticas o principios comunitarios.<br><br>

            <b>4.4 Revisión de Contenido</b><br>
            LuckyEvents se reserva el derecho de revisar y aprobar cualquier contenido antes de que sea publicado o distribuido a través de la plataforma. Esta revisión tiene como objetivo garantizar que el contenido sea apropiado y que no infrinja los derechos de terceros.<br><br>

            <b>4.5 Exención de Responsabilidad</b><br>
            LuckyEvents no asume responsabilidad por el uso indebido del contenido por parte de terceros, ni por cualquier infracción de derechos de autor cometida por los usuarios al compartir contenido en la plataforma. Los usuarios son responsables de asegurarse de que cualquier contenido compartido cumple con las normativas y derechos aplicables.<br><br>

            <b>5. Modificaciones de los Términos</b><br>
            LuckyEvents se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde el momento en que se publiquen en nuestro sitio web. Su uso continuado de la plataforma después de la publicación de los cambios implicará su aceptación de los mismos.<br><br>

            <b>6. Ley Aplicable y Jurisdicción</b><br>
            Estos Términos y Condiciones se rigen por las leyes de España y cualquier disputa derivada de su uso se resolverá ante los tribunales competentes.<br><br>

            <b>7. Contacto</b><br>
            Para cualquier pregunta sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros a través de correo electrónico: comunicacion@luckyevents.com.
        </div>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/terminosYPropositos.js') }}"></script>
</body>

</html>