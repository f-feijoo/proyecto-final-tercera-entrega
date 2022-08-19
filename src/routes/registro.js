import express from "express";
import passport from "passport";
import multer from "multer";

const { Router } = express;

let router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage });

router.get("/", (req, res) => {
  res.render("register");
});

router.post(
  "/",
  upload.single("avatar"),
  passport.authenticate("registro", {
    successRedirect: "/login",
    failureRedirect: "/registro/errorRegistro",
  })
);

router.get("/errorRegistro", (req, res) => {
  res.render("error-register");
});

export default router;
