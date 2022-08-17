import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../daos/usuarios/UsuariosDao.js";

const LocalStrategy = Strategy;

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = { username: username };
      const usuarioBD = await Usuarios.mostrar(user);
      if (usuarioBD) {
        return done(null, false);
      }
      const usuarioNuevo = await Usuarios.guardar({
        username: username,
        password: Usuarios.encriptar(password),
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        avatar: req.body.avatar
      });
      done(null, usuarioNuevo);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = { username: username };
      const usuarioBD = await Usuarios.mostrar(user);
      if (!usuarioBD) {
        return done(null, false);
      }
      if (!Usuarios.comparar(usuarioBD.password, password)) {
        return done(null, false);
      }
      return done(null, usuarioBD);
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.mostrar({ id: id });
  done(null, usuario);
});
