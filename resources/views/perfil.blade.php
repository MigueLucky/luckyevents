<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/general.css') }}">
    <link rel="stylesheet" href="{{ asset('css/perfil.css') }}">
    <title>LuckyEvents</title>
</head>

<body>
    @include('components.header')
    <main>
        <article class="detrasContenido">
            <section id="detrasSalirSinGuardar">
                <div id="salirSinGuardar">
                    <h3>No has terminado el evento ¿seguro que quieres salir?</h3>
                    <div>
                        <p class="boton">Volver al evento</p>
                        <p class="boton">Salir</p>
                        <p class="boton">Guardar y salir</p>
                    </div>
                </div>
            </section>
            <section class="contenido"></section>
        </article>
        <article class="vehiculos">
            <h2>Vehiculos</h2>
            <section class="crearVehiculo">
                <p class="boton anadirVehiculo">Añadir vehiculo</p>
                <div>
                    <div>
                        <label for="vehiculoNombre">Nombre:</label>
                        <input type="text" id="vehiculoNombre" name="vehiculoNombre" placeholder="Nombre del vehiculo">
                    </div>
                    <div>
                        <label for="vehiculoCapacidad">Capacidad:</label>
                        <input type="number" id="vehiculoCapacidad" name="vehiculoCapacidad" placeholder="Cantidad de asientos">
                    </div>
                    <div>
                        <label for="vehiculoFoto">Foto:</label>
                        <input type="file" id="vehiculoFoto" accept="image/*" style="width: 100%; margin: 0;">
                        <div id="vehiculoPreview"></div>
                    </div>
                    <p class="boton btnVehiculo">Añadir</p>
                </div>
                <p class="respuestaVehiculo"></p>
            </section>
            <section class="listaVehiculo"></section>
        </article>
        <article class="datosUsu">
            <h2></h2>
            <section class="editable">
                <div>
                    <label for="usuNombre">Nombre:</label>
                    <input type="text" id="usuNombre" name="usuNombre" placeholder="Nombre">
                </div>
                <div>
                    <label for="usuApellido">Apellido:</label>
                    <input type="text" id="usuApellido" name="usuApellido" placeholder="Apellido">
                </div>
                <div>
                    <label for="usuLeyenda">Leyenda:</label>
                    <input type="text" id="usuLeyenda" name="usuLeyenda" placeholder="Leyenda">
                </div>
                <div>
                    <label for="usuEmail">Email:</label>
                    <input type="text" id="usuEmail" name="usuEmail" placeholder="Email">
                </div>
                <div>
                    <p class="actuContra boton">Actualizar contraseña</p>
                    <p class="respuestaContra"></p>
                </div>
                <div>
                    <div class="mostrarActuContra" style="display: none;">
                        <div>
                            <label for="antiguaContra">Antigua contraseña:</label>
                            <input type="password" id="antiguaContra" name="antiguaContra" placeholder="Antigua contraseña">
                        </div>
                        <div>
                            <label for="nuevaContra">Nueva contraseña:</label>
                            <input type="password" id="nuevaContra" name="nuevaContra" placeholder="Nueva contraseña">
                        </div>
                        <p class="boton btnActuContra">Actualizar</p>
                    </div>
                </div>
                <div>
                    <label for="usuFoto">Foto:</label>
                    <input type="file" id="usuFoto" accept="image/*">
                    <div id="UsuPreview"></div>
                </div>
                <div>
                    <label for="usuUbicacion">Ubicacion favorita:</label>
                    <input type="text" id="usuUbicacion" name="usuUbicacion" placeholder="Ubicacion">
                </div>
                <div>
                    <p class="actuDatos boton">Actualizar datos</p>
                    <p class="respuestaActuDatos"></p>
                </div>
            </section>
        </article>
        <article class="historialEventos">
            <h2>Historial de tus eventos</h2>
            <p class="mensajeError3"></p>
            <section class="historial"></section>
        </article>
    </main>
    @include('components.footer')
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/general.js') }}"></script>
    <script src="{{ asset('js/perfil.js') }}"></script>
</body>

</html>