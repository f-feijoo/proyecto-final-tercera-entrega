import express from "express";
import { productosDao as productosApi } from "../daos/index.js";
import Usuarios from "../daos/usuarios/UsuariosDao.js";

const { Router } = express;

const router = new Router();

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", auth, async (req, res) => {
  res.render("index", {
    data: await productosApi.mostrarTodos(),
    user: await Usuarios.mostrar({ username: req.user.username }),
  });
});

export default router;
