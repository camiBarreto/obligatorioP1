document.querySelector("#btnRegistroUsuario").addEventListener("click" , registarseUsuarioUI);
document.querySelector("#btnIniciarSesionUsuario").addEventListener("click" , login);
document.querySelector("#btnRegistrarse").addEventListener("click" , registrarse);

let sistema = new Sistema();
ocultarSeccion("registroCliente");
ocultarSeccion("vistaUsuario");
function registarseUsuarioUI () {

let nombreUsuario = document.querySelector ("#txtNombre").value;
let apellidoUsuario = document.querySelector ("#txtApellidoUsuario").value;
let usuarioIngresado = document.querySelector ("#txtNombreUsuario").value;
let contrasenaIngresada = document.querySelector ("#txtContrasena").value;
let tarjetaDeCreditoIngresada = Number(document.querySelector ("#txtTarjetaDeCredito").value);
let cvcIngresado = Number(document.querySelector ("#txtCVCTarjeta").value);

let mensaje = "";
let errores = [];

/*if (nombreUsuario === "" ) {
    errores.push("Debes ingresar un nombre de usuario");
} CORRECCIÓN*/
if (usuarioIngresado === "") {
    errores.push("Debes ingresar un nombre de usuario");
} else if (sistema.buscarUsuario(usuarioIngresado)) {
    errores.push("El nombre de usuario ya existe");
}

if (apellidoUsuario === "") {
    errores.push("Debes ingresar un apellido de usuario");
}

if(usuarioIngresado === "" || sistema.buscarUsuario(usuarioIngresado) !== null) {
    errores.push("Debes ingresar un nombre de usuario o el nombre de usuario ya existe");
}
                    
if (contrasenaIngresada.toString().length < 5 || !sistema.validarContrasena(contrasenaIngresada)) {
    errores.push ("La contrasena debe tener  un mínimo  de 5 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.");
}

if (isNaN(tarjetaDeCreditoIngresada)){
   errores.push ("tiene que ser numero tarjeta");


}

if (tarjetaDeCreditoIngresada.toString().length !== 16) {
    errores.push ("tarjeta debe tener 16")
}

if (isNaN(cvcIngresado)) {
    errores.push ("El cvc es numerico");
}

if (cvcIngresado.toString().length !== 3) {
    errores.push ("cvc debe tener 3 caract")
}

if (errores.length === 0) {
    let usuarioGuardado = sistema.registrarUsuario(nombreUsuario, apellidoUsuario, usuarioIngresado, contrasenaIngresada, tarjetaDeCreditoIngresada, cvcIngresado)

    if (usuarioGuardado) {
        mensaje = "Usuario guardado correctamente";
        ocultarSeccion("registroCliente");
        mostrarSeccion("loginUsuario");
    } else {
        mensaje = "Hubo un error al guardar el usuario";
    }

} else {
    mensaje = "<ul>";
    for (let i = 0; i < errores.length; i++) {
        mensaje += `<li>${errores[i]}</li>`;
    }
    mensaje += "</ul>";

}
    document.querySelector("#pResultadoRegistrarseUsuario").innerHTML = mensaje;
}

function mostrarSeccion(pIdSeccion){
    document.querySelector(`#${pIdSeccion}`).style.display = "block";
}
function ocultarSeccion(pIdSeccion){
    document.querySelector(`#${pIdSeccion}`).style.display = "none";
}

function login(){
    let nombreUsuario = document.querySelector("#txtNombreUsuario").value;
    let contrasenaUsuario = document.querySelector("#txtContrasenaUsuario").value;
    let mensaje = "";
    if(contrasenaUsuario !== "" && nombreUsuario !== ""){
        /*saqué los console.log y puse dos mensajes de prueba */
        if(sistema.buscarUsuario(nombreUsuario) && sistema.validarContrasena(contrasenaUsuario)){
            ocultarSeccion("loginUsuario")
            mostrarSeccion("vistaUsuario");
        }else{
            mensaje = document.querySelector("#pResultadoLoginUsuario").innerHTML = "Contraseña o usuario incorrecto.";
        }

    }
}
function registrarse(){
    ocultarSeccion("loginUsuario");
    mostrarSeccion("registroCliente");
}