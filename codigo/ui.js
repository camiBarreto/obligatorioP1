document
  .querySelector("#btnRegistroUsuario")
  .addEventListener("click", registarseUsuarioUI);
document
  .querySelector("#btnIniciarSesionUsuario")
  .addEventListener("click", login);
document
  .querySelector("#btnRegistrarse")
  .addEventListener("click", registrarse);

document
  .querySelector("#btnRegistroUsuarioAtras")
  .addEventListener("click", irAlLogin);
document.querySelector("#btnAgregarDestino").addEventListener("click", agregarDestinos);
document.querySelector("#aCerrarSesion").addEventListener("click", logOut);
document.querySelector("#verDestinosAdmin").addEventListener("click", armarTablaVerDestinos);






let tabla;

let sistema = new Sistema();
precargarInicio();
let nombreUsuarioLogueado = "";



function precargarInicio() {
  ocultarSeccion("registroCliente");
  ocultarSeccion("vistaUsuario");
  ocultarSeccion("agregarDestinosAdmin");
  mostrarSeccion("loginUsuario");
  ocultarSeccion ("nav");
  ocultarSeccion("tablaDestinos");
  ocultarSeccion("formularioEdicion");
  ocultarSeccion("divContenidoAdministrador");
  
  }

function logOut () {
  precargarInicio();
  nombreUsuarioLogueado = "";
  limpiarElemento("txtNombreUsuarioLogin");
  limpiarElemento("txtContrasenaUsuario");

}



function registarseUsuarioUI() {
  let nombreUsuario = document.querySelector("#txtNombre").value;
  let apellidoUsuario = document.querySelector("#txtApellidoUsuario").value;
  let usuarioIngresado = document.querySelector("#txtNombreUsuario").value;
  let contrasenaIngresada = document.querySelector("#txtContrasena").value;
  let tarjetaDeCreditoIngresada = document.querySelector("#txtTarjetaDeCredito").value;
  let cvcIngresado = Number(document.querySelector("#txtCVCTarjeta").value);

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

  if (
    usuarioIngresado === "" ||
    sistema.buscarUsuario(usuarioIngresado) !== null
  ) {
    errores.push(
      "Debes ingresar un nombre de usuario o el nombre de usuario ya existe"
    );
  }

  if (
    contrasenaIngresada.toString().length < 5 ||
    !sistema.validarContrasena(contrasenaIngresada)
  ) {
    errores.push(
      "La contrasena debe tener  un mínimo  de 5 caracteres, incluyendo al menos una mayúscula, una minúscula y un número."
    );
  }

  if (!sistema.validarTarjetaDeCredito(tarjetaDeCreditoIngresada)) {
    errores.push(
      "La tarjeta debe tener el siguiente formato: 1234-5678-9123-4567"
    );
  }

  if (isNaN(cvcIngresado)) {
    errores.push("El cvc es numerico");
  }

  if (cvcIngresado.toString().length !== 3) {
    errores.push("cvc debe tener 3 caracteres");
  }

  if (errores.length === 0) {
    let usuarioGuardado = sistema.registrarUsuario(
      nombreUsuario,
      apellidoUsuario,
      usuarioIngresado,
      contrasenaIngresada,
      tarjetaDeCreditoIngresada,
      cvcIngresado
    );

    if (usuarioGuardado) {
      mensaje = "Usuario guardado correctamente";
      
      ocultarSeccion("registroCliente");
      mostrarSeccion("loginUsuario");
      imprimirEnHTML("pResultadoLoginUsuario", "");
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

function mostrarSeccion(pIdSeccion) {
  document.querySelector(`#${pIdSeccion}`).style.display = "block";
}

function ocultarSeccion(pIdSeccion) {
  document.querySelector(`#${pIdSeccion}`).style.display = "none";
}

function login() {
  let nombreUsuario = document.querySelector("#txtNombreUsuarioLogin").value;
  let contrasenaUsuario = document.querySelector("#txtContrasenaUsuario").value;
  let mensaje = "";
  if (contrasenaUsuario !== "" && nombreUsuario !== "") {
    /*saqué los console.log y puse dos mensajes de prueba */
    let usuario = sistema.hacerLogin(nombreUsuario, contrasenaUsuario);
    if (usuario !== null) {
      nombreUsuarioLogueado = usuario.nombreUsuario;
      if (usuario.tipo === "cliente") {
        ocultarSeccion("loginUsuario");
        limpiarCampoRegistro();
        mostrarSeccion("nav")
        mostrarSeccion("vistaUsuario");
        navCliente ();
        armarTablaVerDestinosUsuario ();
        agregarEventosClickBtnsReservaDestinoUsuario();
               
      } else if (usuario.tipo === "administrador") {
        mostrarSeccion("divContenidoAdministrador")
        ocultarSeccion("loginUsuario");
        mostrarSeccion("agregarDestinosAdmin");
        ocultarSeccion("divSlcEstadoDestino");
        mostrarSeccion("nav")
        navAdmin ();


      } else {
        mensaje = "Error";
        nombreUsuarioLogueado = "";
      }
    } else {
      mensaje = "Contraseña o usuario incorrecto.";
      nombreUsuarioLogueado = "";
    }
  } else {
    mensaje = "Debes ingresar datos a los campos";
    nombreUsuarioLogueado = "";
  }

  document.querySelector("#pResultadoLoginUsuario").innerHTML = mensaje;
}

function registrarse() {
  ocultarSeccion("loginUsuario");
  mostrarSeccion("registroCliente");
  ocultarSeccion("nav");
}

function navCliente () {
  mostrarSeccion ("liCerrarSesion");
  ocultarSeccion("liDestinosAdmin");

}

function navAdmin () {
  mostrarSeccion ("liCerrarSesion");
  mostrarSeccion ("liDestinosAdmin");
}

function limpiarCampoRegistro() {
  limpiarElemento("txtNombre");
  limpiarElemento("txtApellidoUsuario");
  limpiarElemento("txtNombreUsuario");
  limpiarElemento("txtContrasena");
  limpiarElemento("txtTarjetaDeCredito");
  limpiarElemento("txtCVCTarjeta");
}

function imprimirEnHTML(pIdElemento, pContenido) {
  document.querySelector(`#${pIdElemento}`).innerHTML = pContenido;
}

function limpiarElemento(pIdElemento) {
  document.querySelector(`#${pIdElemento}`).value = "";
}


function irAlLogin() {
  mostrarSeccion("loginUsuario");
  ocultarSeccion("registroCliente");
}

function agregarDestinos() {
  let nombreDestino = document.querySelector("#txtNombreDestino").value;
  let descripcionDestino = document.querySelector("#txtDescripcionDestino").value;
  let precioDestino = Number(document.querySelector("#txtPrecioDestino").value);
  let cuposDisponibles = Number(document.querySelector("#txtCuposDisponibles").value);
  let urlImagenDestino = document.querySelector("#txtUrlImagen").value;
  let slcOfertaDestino = document.querySelector("#slcOfertaDestino").value;


  let errores = [];
  let mensaje = "";

  if (nombreDestino === "") {
    errores.push("Debes ingresar un nombre de destino");
  }

  if (descripcionDestino === "") {
    errores.push("Debes ingresar una descripcion");
  }

  if (isNaN(precioDestino) || precioDestino <= 0 || precioDestino === "") {
    errores.push("El precio debe ser un numero mayor a 0");
  }
  
  
  if (isNaN(cuposDisponibles)) {
    errores.push("Los cupos deben ser un numero mayor a 0");
  }

  if (cuposDisponibles <= 0) {
    errores.push("Los cupos deben ser mas que 0");
  }

  if (urlImagenDestino === "") {
    errores.push("Debes ingresar una foto");
  }

  if (slcOfertaDestino === "") {
    errores.push("Debes seleccionar si se encuentra en oferta o no");

  }

  if (errores.length === 0) {
    let destinoGuardadoOK = sistema.registrarDestino(
      nombreDestino,
      descripcionDestino,
      precioDestino,
      cuposDisponibles,
      urlImagenDestino,
      slcOfertaDestino
    );
    
    if (destinoGuardadoOK) {
      mensaje = "Destino guardado correctamente";
      tabla = sistema.armarTablaDestinos();
      
    } else {
      mensaje = "Hubo errores en el guardado";
    }
  } else {
    mensaje = "<ul>";
    for (let i = 0; i < errores.length; i++) {
      mensaje += `<li>${errores[i]}</li>`;
    }
    mensaje += "</ul>";
  }

  document.querySelector("#pErroresAgregarDestinos").innerHTML = mensaje;

}



function armarTablaVerDestinos () {

  tabla = sistema.armarTablaDestinos();
  ocultarSeccion("agregarDestinosAdmin");
  imprimirEnHTML ("tablaDestinos", tabla);
  mostrarSeccion ("tablaDestinos");
  mostrarSeccion ("formularioEdicion");
  agregarEventosClickBtnsPausarDestinoAdmin();
  agregarEventosClickBtnsActivarDestinoAdmin();
  agregarEventosClickBtnsPausarOfertaAdmin();
  agregarEventosClickBtnsActivarOfertaAdmin();

}
//Funciones para eventos de botón estado Pausado o Activo
function agregarEventosClickBtnsPausarDestinoAdmin() {
  let listaBotones = document.querySelectorAll(".btnsPausarDestino");
  for(let i = 0; i < listaBotones.length; i++) {
      let botonActual = listaBotones[i];
      document.querySelector(`#${botonActual.id}`).addEventListener("click", pausarDestinoUI);
  }
}

function agregarEventosClickBtnsActivarDestinoAdmin() {
  let listaBotones = document.querySelectorAll(".btnsActivarDestino");
  for(let i = 0; i < listaBotones.length; i++) {
      let botonActual = listaBotones[i];
      document.querySelector(`#${botonActual.id}`).addEventListener("click", activarDestinoUI);
  }
}
function pausarDestinoUI() { 
  let idDestino = this.getAttribute("id-destino");
  sistema.pausarDestino(idDestino);
  armarTablaVerDestinos();
}

function activarDestinoUI() { 
  let idDestino = this.getAttribute("id-destino");
   sistema.activarDestino(idDestino);
   armarTablaVerDestinos();
}
//Funciones para eventos de botón oferta "Pausada" o "Activa"
function agregarEventosClickBtnsPausarOfertaAdmin() {
  let listaBotones = document.querySelectorAll(".btnsPausarOferta");
  for(let i = 0; i < listaBotones.length; i++) {
      let botonActual = listaBotones[i];
      document.querySelector(`#${botonActual.id}`).addEventListener("click", pausarOfertaUI);
  }
}

function agregarEventosClickBtnsActivarOfertaAdmin() {
  let listaBotones = document.querySelectorAll(".btnsActivarOferta");
  for(let i = 0; i < listaBotones.length; i++) {
      let botonActual = listaBotones[i];
      document.querySelector(`#${botonActual.id}`).addEventListener("click", activarOfertaUI);
  }
}
function pausarOfertaUI() { 
  let idDestino = this.getAttribute("id-destino");
  sistema.pausarOferta(idDestino);
  armarTablaVerDestinos();
}

function activarOfertaUI() { 
  let idDestino = this.getAttribute("id-destino");
   sistema.activarOferta(idDestino);
   armarTablaVerDestinos();
}


//FIN PRUEBA

function armarTablaVerDestinosUsuario () {
  let tablaVerDestinosUsuario = sistema.armarTablaDestinosClientes();
  imprimirEnHTML ("tablaDestinosUsuario", tablaVerDestinosUsuario);
  mostrarSeccion ("tablaDestinosUsuario");

}

function agregarEventosClickBtnsReservaDestinoUsuario() {
  let listaBotones = document.querySelectorAll(".btnsReservarProducto");
  for(let i = 0; i < listaBotones.length; i++) {
      let botonActual = listaBotones[i];
      document.querySelector(`#${botonActual.id}`).addEventListener("click", reservarProductoUI);
  }
}

function reservarProductoUI() {
  let idProducto = Number(this.getAttribute("id-producto"));
  sistema.reservarDestino(idProducto, nombreUsuarioLogueado);
  
}

