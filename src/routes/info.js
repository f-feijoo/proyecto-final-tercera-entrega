import express from "express";
import { carritosDao as carritosApi } from "../daos/index.js";
import Usuarios from "../daos/usuarios/UsuariosDao.js";

const { Router } = express;

let router = new Router();

router.get("/", async (req, res) => {
  let carrito = await carritosApi.mostrar({
    usuario: req.user.username,
    finalizado: false,
  });
  let param;
  if (carrito) {
    param = "api/carritos/" + carrito.id + "/productos";
  } else {
    param = "#";
  }
  res.render("info", {
    nroC: param,
    user: await Usuarios.mostrar({ username: req.user.username }),
  });
});

export default router;
