class Destino {
    static idContadorDestino = 1;

    constructor (pNombre, pDescripcion, pPrecio, pCuposDisponibles, pImagen) {
       
        this.id = `DEST_ID_${Destino.idContadorDestino++}`;
        this.nombre = pNombre;
        this.descripcion = pDescripcion;
        this.precio = pPrecio;
        this.cuposDisponibles = pCuposDisponibles;
        this.imagen = pImagen;

    }
}