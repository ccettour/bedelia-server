const passport = require("passport");
const passportJWT = require("passport-jwt");
const usuarioBD = require("../baseDeDatos/usuarioBD");
require("dotenv").config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

//Para validar usuarios
passport.use(new LocalStrategy({
    usernameField: "correoElectronico",
    passwordField: "clave"
},
    async (correo, clave, cb) => {
        try {
            const usuario = await usuarioBD.buscar(correo, clave);
            if (!usuario) {
                return cb(null, flase, { message: "El correo y/o la contraseña ingresados son inválidos" })
            } else {
                return cb(null, usuario, { message: "Bienvenido/a" })
            }
        } catch (ex) {
            cb(ex);
        }
    }
));


//Para validar tokens
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, cb) => {
        const usuario = await usuarioBD.buscarPorID(jwtPayload.idUsuario);
        if (usuario) {
            return cb(null, usuario);
        } else {
            return cb(null, false, { message: "Token incorrecto" });
        }
    }
));