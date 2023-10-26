const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{

    const errores = validationResult(req);

    //Si hay errores falla y le manda los errores al cliente
    if (!errores.isEmpty()){
        return res.status(400).json({estado:'FALLA', msj:errores.mapped()})
    }

    //Si no hay errores sigo con la ejecucion del controlador de la ruta
    next();
}

module.exports ={
    validarCampos,
}