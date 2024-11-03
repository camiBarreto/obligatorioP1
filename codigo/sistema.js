
class Sistema {
    constructor() {
        this.usuarios = [];
        this.contadorId = 1;
        this.destinos = [];
        this.crearUsuarioAdmin();
        

        console.log("Se inicio el sistema");
    }

    registrarUsuario(pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc) {
        
        let seGuardoOK = false;
        if(pNombre !== "" && isNaN(pNombre) && 
            pApellido !== "" && isNaN(pApellido) && 
            pNombreUsuario !== "" && 
            pContrasena.length >= 5 && this.validarContrasena(pContrasena) && 
            this.validarTarjetaDeCredito (pTarjeta) === true && 
            !isNaN(pCvc) && pCvc.toString().length === 3 &&
            this.buscarUsuario(pNombreUsuario) === null) /*Aquí puse igual a null cosa que si es nulo registra el nuevo usaurio*/{
            

                let nuevoUsuario = new Usuario (this.contadorId, pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc, "cliente")
                this.usuarios.push(nuevoUsuario);
                seGuardoOK = true;
                this.contadorId++



            }
        

        return seGuardoOK;

    }

    validarTarjetaDeCredito (pTarjeta) {
        let tarjetaOk = false;
        if (pTarjeta.length === 19) {
            if (pTarjeta.charAt(4) === "-" && pTarjeta.charAt(9) === "-" && pTarjeta.charAt(14) === "-"){
                
                let numeroTarjeta = 0;
                for (let i = 0 ; i < pTarjeta.length ; i++) {
                    if (!isNaN(pTarjeta.charAt(i))){
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

    buscarUsuario (pNombreUsuario) {
        let existeUsuario = null;/*cambiado a null */
        
            let i = 0;

            while (i < this.usuarios.length && existeUsuario === null)/*cambiado a null */ {
                let usuarioActual = this.usuarios[i];
                if (usuarioActual.nombreUsuario === pNombreUsuario) {
                    existeUsuario = usuarioActual;
                    
                }
                i++;
            } 

        return existeUsuario;
        
    }

    hacerLogin (pNombreUsuario , pContrasena) {

        let usuario = this.buscarUsuario(pNombreUsuario);
        if (usuario !== null) {
            if (usuario.contrasena !== pContrasena) {
                usuario = null;
            }
        }

        return usuario;

    }

    validarContraseñaUsuario(pContrasena, pNombreUsuario){
        let coincideContrasena = false;
        let usuario = this.buscarUsuario(pNombreUsuario); /*pasamos la funcion con el nombre de usuario q recibimos como hacer: this.buscarUsuario(pNombreUsuario).contrasena*/
        if (usuario !== null && usuario.contrasena === pContrasena){
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
            }
            else if (charActual === charActual.toLowerCase() && isNaN(charActual)) {
                contadorMinusculas++;
            }
            else if (!isNaN(charActual) && charActual !== " ") {
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

    crearUsuarioAdmin(pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc) {
           
        let nuevoUsuario = new Usuario("","camila","barreto", "cBarreto", "Cami1", "1234-5556-5555-5555", "123", "administrador");
        this.usuarios.push(nuevoUsuario);
        
    }
    registrarDestino (pNombre, pDescripcion, pPrecio, pCuposDisponibles, pImagen, pOferta) {
        let guardadoOK = false;

        if (pNombre !== "" && pDescripcion !== "" && !isNaN(pPrecio) && pPrecio > 0 && !isNaN(pCuposDisponibles) && pCuposDisponibles > 0 && pImagen !== "" && pOferta !== "") {
            let nuevoDestino = new Destino (pNombre, pDescripcion, pPrecio, pCuposDisponibles, pImagen, "activo", pOferta);
            this.destinos.push(nuevoDestino);
            guardadoOK = true;

           }

           return guardadoOK;
           
    }

    armarTablaDestinos () {
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
                                <td><img width="30px" src="${destinoActual.imagen}" alt="${destinoActual.nombre}" /></td>
                                <td>${destinoActual.estado}</td>
                                <td>${destinoActual.oferta}</td>
                            </tr>`;
        }

        tablaArmada += `</tbody></table>`;

        return tablaArmada;
    

    }

}