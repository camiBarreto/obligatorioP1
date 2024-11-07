class Reserva {
    static idReserva = 1;
    constructor(pDestino, pUsuario) {
        this.id = Compra.idCompra++;
        this.destino = pDestino;
        this.usuario = pUsuario;
        this.estado = "pendiente" //pendiente - cancelada - aprobada
    }
}