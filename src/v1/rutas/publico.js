const { Router } = require('express');

const { enviarCorreo } = require('../../controladores/publico');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();

router.post('/contacto', [
    check("nombre","Ingrese su nombre").not().isEmpty(),
    check("email","Ingrese su correo").isEmail(),
    check("mensaje","Escriba un mensaje").not().isEmpty(),
    validarCampos
], enviarCorreo);

module.exports = router;