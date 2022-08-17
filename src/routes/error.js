import express from "express";
import log4js from "log4js";

const { Router } = express;

let router = new Router();

const loggerFiles = log4js.getLogger("warnLogs");

router.get("*", (req, res) => {
  loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`);
  res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` });
});

router.post("*", (req, res) => {
  loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`);
  res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` });
});

router.put("*", (req, res) => {
  loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`);
  res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` });
});

router.delete("*", (req, res) => {
  loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`);
  res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` });
});

export default router;
