class Destino {
    static idContadorDestino = 1;

    constructor (pNombre, pDescripcion, pPrecio, pCuposDisponibles, pImagen, pEstado, pOferta) {
       
        this.id = `DEST_ID_${Destino.idContadorDestino++}`;
        this.nombre = pNombre;
        this.descripcion = pDescripcion;
        this.precio = pPrecio;
        this.cuposDisponibles = pCuposDisponibles;
        this.imagen = pImagen;
        this.estado = pEstado;
        this.oferta = pOferta;

    }
}