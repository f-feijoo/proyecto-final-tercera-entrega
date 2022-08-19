import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      productos: { type: [], required: true },
      timestamp: { type: Number, required: true },
      usuario: { type: String, required: true },
      finalizado: { type: Boolean, required: true },
    });
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }
}

export default CarritosDaoMongoDb;
