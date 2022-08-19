import app from "./app.js";
import "dotenv/config";
import cluster from "cluster";
import os from "os";
import log4js from "./loggers/config.js";

const loggerConsole = log4js.getLogger();

const MODO_CLUSTER = process.env.MODO === "CLUSTER";

const PORT = process.env.PORT || 8080;

if (MODO_CLUSTER && cluster.isPrimary) {
  const cpus = os.cpus().length;
  loggerConsole.info(
    `Primary PID ${process.pid}, port ${PORT}, modo ${process.env.MODO},  base de datos: ${process.env.PERS}`
  );
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  const server = app.listen(PORT, () => {
    loggerConsole.info(
      `Servidor http escuchando en el puerto ${PORT}, process ID: ${process.pid}`
    );
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
}
