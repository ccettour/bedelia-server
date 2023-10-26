const jwt = require("jsonwebtoken");
const usuarioBD = require("../baseDeDatos/usuarioBD");

require("dotenv").config();

const esDecano = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //Si ingresó un usuario o contraseña incorrecto:
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) => {
        //Si el token fue manipulado y no devuelve los datos:
        if (err) {
            return res .status(403).send({ status: "Fallo", data: { error: "El token no es válido" } });
        }

        //Si está todo OK:
        const data = await usuarioBD.buscarPorID(usuario.idUsuario);

    
        //tipoUsuario: 0=Decano, 1=Bedel
        if (data.tipoUsuario != 0) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = {esDecano};