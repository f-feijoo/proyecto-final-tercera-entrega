import express from "express";
import {
  productosDao as productosApi,
  carritosDao as carritosApi,
} from "../daos/index.js";
import Usuarios from "../daos/usuarios/UsuariosDao.js";
import mailCompraAdmin from "../nodemailer/mailCompra.js";
import mensajeCliente from "../twilio/mensajeCompra.js"
import mensajeCompraAdmin from "../twilio/whatsappCompra.js"

const { Router } = express;

const carritoRouter = new Router();

carritoRouter.get("/:id/productos", async (req, res) => {
  res.render("carrito", {
    data: await carritosApi.mostrar({ _id: req.params.id }),
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: await Usuarios.mostrar({ username: req.user.username }),
  });
});

carritoRouter.post("/:id/productos", async (req, res) => {
  const carrito = await carritosApi.mostrar({ _id: req.params.id });
  const producto = await productosApi.mostrar({ _id: req.body.id });
  carrito.productos.push(producto);
  await carritosApi.actualizar(carrito);
  res.send({ message: `Producto agregado, id: ${req.body.id}` });
});

carritoRouter.get("/:id/productos/finalizar", async (req, res) => {
  const carrito = await carritosApi.mostrar({ _id: req.params.id });
  const carritoActualizado = await carritosApi.actualizar({
    id: carrito.id,
    productos: carrito.productos,
    timestamp: carrito.timestamp,
    usuario: carrito.usuario,
    finalizado: true
  })
  await mailCompraAdmin(req.user, carrito);
  await mensajeCliente(req.user)
  await mensajeCompraAdmin(carrito)
  res.render("comprado", {
    data: carrito,
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: req.user,
  });
});

carritoRouter.post("/", async (req, res) => {
  let obj = {
    timestamp: Date.now(),
    productos: [],
    usuario: req.user.username,
    finalizado: false,
  };
  res.send({
    message: `Carrito creado, id: ${(await carritosApi.guardar(obj)).id}`,
  });
});

carritoRouter.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await carritosApi.borrar(id);
  res.send({ delete: "ok", id: id });
});

carritoRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.mostrar({ _id: req.params.id });
  const index = carrito.productos.findIndex((p) => p.id == req.params.id_prod);
  if (index != -1) {
    carrito.productos.splice(index, 1);
    await carritosApi.actualizar(carrito);
  }
  res.send({ message: `Producto con ID ${index} eliminado.` });
});

export default carritoRouter;
