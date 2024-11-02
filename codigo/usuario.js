class Usuario {
    constructor (pId, pNombre, pApellido, pNombreUsuario, pContrasena, pTarjeta, pCvc, pTipo) {

        this.Id = pId;
        this.saldo = 15000;
        this.nombre = pNombre,
        this.apellido = pApellido;
        this.nombreUsuario = pNombreUsuario;
        this.contrasena = pContrasena;
        this.tarjeta = pTarjeta;
        this.cvc = pCvc;
        this.tipo = pTipo;
    }
}