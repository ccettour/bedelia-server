const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const login = async (req, res) => {
    passport.authenticate("local", { session: false }, (error, usuario, info) => {
        if (error || !usuario) {
            return res.status(400).json({estado:"FALLO", msj:info});
        }

        // si existe el usuario, armo el token
        req.login(usuario, { session: false }, (error) => {
            if (error) {
                res.send(error);
                return res.status(400).json({estado:"FALLO", msj:info});
            }
            
            const token = jwt.sign(usuario, process.env.JWT_SECRET);
            return res.json({ usuario, token });
        });
    })(req, res);
};

module.exports={login};