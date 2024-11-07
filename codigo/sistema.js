class Sistema {
  constructor() {
    this.usuarios = [];
    this.contadorId = 1;
    this.destinos = [];
    this.precargarDestinos();
    this.precargarAdmin();

    console.log("Se inicio el sistema");
  }

  registrarUsuario(
    pNombre,
    pApellido,
    pNombreUsuario,
    pContrasena,
    pTarjeta,
    pCvc
  ) {
    let seGuardoOK = false;
    if (
      pNombre !== "" &&
      isNaN(pNombre) &&
      pApellido !== "" &&
      isNaN(pApellido) &&
      pNombreUsuario !== "" &&
      pContrasena.length >= 5 &&
      this.validarContrasena(pContrasena) &&
      this.validarTarjetaDeCredito(pTarjeta) === true &&
      !isNaN(pCvc) &&
      pCvc.toString().length === 3 &&
      this.buscarUsuario(pNombreUsuario) === null
    ) {
      /*Aquí puse igual a null cosa que si es nulo registra el nuevo usaurio*/ let nuevoUsuario =
        new Usuario(
          this.contadorId,
          pNombre,
          pApellido,
          pNombreUsuario,
          pContrasena,
          pTarjeta,
          pCvc,
          "cliente"
        );
      this.usuarios.push(nuevoUsuario);
      seGuardoOK = true;
      this.contadorId++;
    }

    return seGuardoOK;
  }

  registrarAdministrador(
    pNombre,
    pApellido,
    pNombreUsuario,
    pContrasena,
    pTarjeta,
    pCvc
  ) {
    let seGuardoOK = false;
    if (
      pNombre !== "" &&
      isNaN(pNombre) &&
      pApellido !== "" &&
      isNaN(pApellido) &&
      pNombreUsuario !== "" &&
      pContrasena.length >= 5 &&
      this.validarContrasena(pContrasena) &&
      this.validarTarjetaDeCredito(pTarjeta) === true &&
      !isNaN(pCvc) &&
      pCvc.toString().length === 3 &&
      this.buscarUsuario(pNombreUsuario) === null
    ) {
      /*Aquí puse igual a null cosa que si es nulo registra el nuevo usaurio*/ let nuevoUsuario =
        new Usuario(
          this.contadorId,
          pNombre,
          pApellido,
          pNombreUsuario,
          pContrasena,
          pTarjeta,
          pCvc,
          "administrador"
        );
      this.usuarios.push(nuevoUsuario);
      seGuardoOK = true;
      this.contadorId++;
    }

    return seGuardoOK;
  }

  validarTarjetaDeCredito(pTarjeta) {
    let tarjetaOk = false;
    if (pTarjeta.length === 19) {
      if (
        pTarjeta.charAt(4) === "-" &&
        pTarjeta.charAt(9) === "-" &&
        pTarjeta.charAt(14) === "-"
      ) {
        let numeroTarjeta = 0;
        for (let i = 0; i < pTarjeta.length; i++) {
          if (!isNaN(pTarjeta.charAt(i))) {
            numeroTarjeta++;
          }
        }

        if (numeroTarjeta === 16) {
          tarjetaOk = true;
        }
      }
    }

    return tarjetaOk;
  }

  buscarUsuario(pNombreUsuario) {
    let existeUsuario = null; /*cambiado a null */

    let i = 0;

    while (i < this.usuarios.length && existeUsuario === null) {
      /*cambiado a null */ let usuarioActual = this.usuarios[i];
      if (usuarioActual.nombreUsuario === pNombreUsuario) {
        existeUsuario = usuarioActual;
      }
      i++;
    }

    return existeUsuario;
  }

  hacerLogin(pNombreUsuario, pContrasena) {
    let usuario = this.buscarUsuario(pNombreUsuario);
    if (usuario !== null) {
      if (usuario.contrasena !== pContrasena) {
        usuario = null;
      }
    }

    return usuario;
  }

  validarContraseñaUsuario(pContrasena, pNombreUsuario) {
    let coincideContrasena = false;
    let usuario =
      this.buscarUsuario(
        pNombreUsuario
      ); /*pasamos la funcion con el nombre de usuario q recibimos como hacer: this.buscarUsuario(pNombreUsuario).contrasena*/
    if (usuario !== null && usuario.contrasena === pContrasena) {
      coincideContrasena = true;
    }

    return coincideContrasena;
  }

  validarContrasena(pContrasena) {
    let contadorMayusculas = 0;
    let contadorMinusculas = 0;
    let contadorNumeros = 0;
    let contrasenaOK = true;

    for (let i = 0; i < pContrasena.length; i++) {
      let charActual = pContrasena.charAt(i);

      if (charActual === charActual.toUpperCase() && isNaN(charActual)) {
        contadorMayusculas++;
      } else if (charActual === charActual.toLowerCase() && isNaN(charActual)) {
        contadorMinusculas++;
      } else if (!isNaN(charActual) && charActual !== " ") {
        contadorNumeros++;
      }
    }

    if (pContrasena.toString().length < 5) {
      contrasenaOK = false;
    } else if (contadorMayusculas === 0) {
      contrasenaOK = false;
    } else if (contadorMinusculas === 0) {
      contrasenaOK = false;
    } else if (contadorNumeros === 0) {
      contrasenaOK = false;
    }
    return contrasenaOK;
  }

  precargarAdmin() {
    this.registrarAdministrador(
      "Administrador",
      "admin",
      "Admin",
      "Admin1",
      "1234-5556-5555-5555",
      "123"
    );
  }

  precargarDestinos() {
    this.registrarDestino(
      "Punta del Este",
      "Playa",
      5000,
      20,
      "https://laguiadelociouruguay.com/wp-content/uploads/2024/01/punta-del-este-uruguay.webp",
      "si"
    );
  }

  registrarDestino(
    pNombre,
    pDescripcion,
    pPrecio,
    pCuposDisponibles,
    pImagen,
    pOferta
  ) {
    let guardadoOK = false;

    if (
      pNombre !== "" &&
      pDescripcion !== "" &&
      !isNaN(pPrecio) &&
      pPrecio > 0 &&
      !isNaN(pCuposDisponibles) &&
      pCuposDisponibles > 0 &&
      pImagen !== "" &&
      pOferta !== ""
    ) {
      let nuevoDestino = new Destino(
        pNombre,
        pDescripcion,
        pPrecio,
        pCuposDisponibles,
        pImagen,
        "activo",
        pOferta
      );
      this.destinos.push(nuevoDestino);
      guardadoOK = true;
    }

    return guardadoOK;
  }

  armarTablaDestinos() {
    let tablaArmada = `<table border=1>
                            <thead>
                                <th>ID</th>
                                <th>Nombre destino</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Cupos</th>
                                <th>Imagen</th>
                                <th>Estado</th>
                                <th>Oferta</th>
                                <th>Editar</th>
                            </thead>
                            <tbody>`;

    for (let i = 0; i < this.destinos.length; i++) {
      let destinoActual = this.destinos[i];
      tablaArmada += `<tr>
                                <td>${destinoActual.id}</td>
                                <td>${destinoActual.nombre}</td>
                                <td>${destinoActual.descripcion}</td>
                                <td>${destinoActual.precio}</td>
                                <td>${destinoActual.cuposDisponibles}</td>
                                <td><img width="30px" src="${destinoActual.imagen}" alt="${destinoActual.nombre}" /></td>`
                                if (destinoActual.activo) {
                                  tablaArmada += `<td><input class="btnsPausarDestino" id-destino="${destinoActual.id}" id="btnPausarDestino${destinoActual.id}" type="button" value="Pausar"></td>`;
                              } else {
                                  tablaArmada += `<td><input class="btnsActivarDestino" id-destino="${destinoActual.id}" id="btnActivarDestino${destinoActual.id}" type="button" value="Activar"></td>`;
                              }
                              if (!destinoActual.oferta) {
                                  tablaArmada += `<td><input class="btnsActivarOferta" id-destino="${destinoActual.id}" id="btnsActivarOferta${destinoActual.id}" type="button" value="SI"></td>`;
                              } else{
                                tablaArmada += `<td><input class="btnsPausarOferta" id-destino="${destinoActual.id}" id="btnsPausarOferta${destinoActual.id}" type="button" value="PausarOf"></td>`;
                              } 
                              tablaArmada += `<td><input type="button" value="editar" id="${destinoActual.id}" onclick="mostrarFormularioEdicion('${destinoActual.id}')"></td>
                                              </tr>`;
                          }
                          tablaArmada += `</tbody></table>`;
                      
                          return tablaArmada;
                      }
  buscarDestino(pNombreDestino) {
    let destinoEncontrado = null;

    let i = 0;
    while (i < this.destinos.length && destinoEncontrado === null) {
        let destinoActual = this.destinos[i];
        if (destinoActual.nombre === pNombreDestino) {
            destinoEncontrado = destinoActual;
        }
        i++;
    }

    return destinoEncontrado;
}
pausarDestino(pIdDestino) {
  let DestinoAPausar = this.buscarDestinoPorID(pIdDestino);

  let DestinoPausadoOK = false;

  if (DestinoAPausar !== null) {
    DestinoAPausar.activo = false;
    DestinoPausadoOK = true;
      console.log("Destino pausado");
  } else {
      console.error("Error al pausar");
  }

  return DestinoPausadoOK;
}


activarDestino(pIdDestino) {
  let DestinoAActivar = this.buscarDestinoPorID(pIdDestino);

  let DestinoActivadoOK = false;

  if (DestinoAActivar !== null) {
      DestinoAActivar.activo = true;
      DestinoActivadoOK = true;
      console.log("Destino activado");
  } else {
      console.error("Error al activar");
  }

  return DestinoActivadoOK;
}

buscarDestinoPorID(pIdDestino) {
  let destinoEncontrado = null;

  let parteNumerica = '';
  let i = pIdDestino.length - 1;

  while (i >= 0 && !isNaN(pIdDestino[i])) {
      parteNumerica = pIdDestino[i] + parteNumerica;
      i--;
  }

  let idDestinoNumerico = parseInt(parteNumerica);

  let I = 0;
    while (I < this.destinos.length && destinoEncontrado === null) {
        let destinoActual = this.destinos[I];
        
        if (destinoActual.idNumerico === idDestinoNumerico) {
            destinoEncontrado = destinoActual;
        }
        I++;
    }

    console.log(destinoEncontrado);
    return destinoEncontrado;
}

pausarOferta(pIdDestino) {
  let ofertaAPausar = this.buscarDestinoPorID(pIdDestino);

  let OfertaPausadaOK = false;

  if (ofertaAPausar !== null) {
    ofertaAPausar.oferta = false;
    OfertaPausadaOK = true;
      console.log("Oferta pausada");
  } else {
      console.error("Error al pausar la oferta");
  }

  return OfertaPausadaOK;
}


activarOferta(pIdDestino) {
  let OfertaAActivar = this.buscarDestinoPorID(pIdDestino);

  let OfertaActivadaOK = false;

  if (OfertaAActivar !== null) {
    OfertaAActivar.oferta = true;
    OfertaActivadaOK = true;
      console.log("Oferta activada");
      console.log(OfertaActivadaOK + "para " + pIdDestino );
  } else {
      console.error("Error al activar la oferta");
  }

  return OfertaActivadaOK;
}





//FIN DE PRUEBA
    armarTablaDestinosClientes() {
    let tablaArmada = `<table border=1>
    <thead>
    <th>Nombre destino</th>
    <th>Descripcion</th>
    <th>Precio</th>
    <th>Cupos</th>
    <th>Imagen</th>
    <th>Oferta</th>
    <th>Reservar</th>
    </thead>
    <tbody>`;
    
    for (let i = 0; i < this.destinos.length; i++) {
        let destinoActual = this.destinos[i];
        if (destinoActual.estado === "activo" && destinoActual.cuposDisponibles > 0) {
        tablaArmada += `<tr>
                                <td>${destinoActual.nombre}</td>
                                <td>${destinoActual.descripcion}</td>
                                <td>${destinoActual.precio}</td>
                                <td>${destinoActual.cuposDisponibles}</td>
                                <td><img width="30px" src="${destinoActual.imagen}" alt="${destinoActual.nombre}" /></td>
                                <td>${destinoActual.oferta}</td>
                                <td><input type= "button" value="Reservar" id=${destinoActual.id}></td>
                            </tr>`;
      }

    }
    
    tablaArmada += `</tbody></table>`;
    return tablaArmada;
    
  }

  
}
