
class Sistema {
    constructor() {
        this.usuarios = [];
        this.contadorId = 1;
        console.log("Se inicio el sistema");
    }

    registrarUsuario(pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc) {
        
        let seGuardoOK = false;
        if(pNombre !== "" && isNaN(pNombre) && 
            pApellido !== "" && isNaN(pApellido) && 
            pNombreUsuario !== "" && 
            pContrasena.length >= 5 && this.validarContrasena(pContrasena) && 
            !isNaN(pTarjeta) && pTarjeta.toString().length === 16 && 
            !isNaN(pCvc) && pCvc.toString().length === 3 &&
            this.buscarUsuario(pNombreUsuario) === null) /*Aquí puse igual a null cosa que si es nulo registra el nuevo usaurio*/{
            

                let nuevoUsuario = new Usuario (this.contadorId, pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc)
                this.usuarios.push(nuevoUsuario);
                seGuardoOK = true;
                this.contadorId++



            }
        

        return seGuardoOK;

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
    

            

}