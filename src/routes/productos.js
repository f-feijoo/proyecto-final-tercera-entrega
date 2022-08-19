import express from "express";
import {
  productosDao as productosApi,
  carritosDao as carritosApi,
} from "../daos/index.js";
import Usuarios from "../daos/usuarios/UsuariosDao.js";

const { Router } = express;

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  if (req.query.admin) {
    res.render("productosAdmin", { data: await productosApi.mostrarTodos() });
  } else {
    // ARREGLAR CUANDO NO HAR CARRITOS CARGADOS
    let carrito = await carritosApi.mostrar({
      usuario: req.user.username,
      finalizado: false,
    });
    let param;
    if (carrito) {
      param = "carritos/" + carrito.id + "/productos";
    } else {
      param = "#";
    }

    res.render("productos", {
      data: await productosApi.mostrarTodos(),
      nroC: param,
      user: await Usuarios.mostrar({ username: req.user.username }),
    });
  }
});

productosRouter.get("/:id", async (req, res) => {
  res.json(await productosApi.mostrar(req.params.id));
});

// PARA ACCEDER USAR QUERY PARAMS ADMIN=TRUE

productosRouter.post("/", async (req, res) => {
  if (req.query.admin) {
    const obj = req.body;
    let productoNuevo = {
      ...obj,
      timestamp: Date.now(),
      codigo: obj.nombre.toLowerCase().replace(/\s/, "-"),
    };
    res.render("uploaded", {
      data: await productosApi.guardar(productoNuevo),
    });
  } else {
    res.send({ error: "permiso denegado" });
  }
});

productosRouter.put("/:id", async (req, res) => {
  if (req.query.admin) {
    let newProd = {
      ...req.body,
      timestamp: Date.now(),
      codigo: (req.body.nombre + req.params.id)
        .toLowerCase()
        .replace(/\s/, "-"),
    };
    res.render("uploaded", { data: await productosApi.actualizar(newProd) });
  } else {
    res.send({ error: "permiso denegado" });
  }
});

productosRouter.delete("/:id", async (req, res) => {
  if (req.query.admin) {
    await productosApi.borrar(req.params.id);
    res.send({ delete: "ok", id: req.params.id });
  } else {
    res.send({
      error: -1,
      descripcion: "ruta '/api/productos' método 'DELETE' no autorizada",
    });
  }
});

export default productosRouter;
