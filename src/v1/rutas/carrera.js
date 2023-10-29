const { Router } = require("express");
const { buscarPorId, buscarCarreras, eliminar, crear, actualizar } = require("../../controladores/carreras");

const router = Router();

//crear
router.post("/carreras", crear);

//eliminar
router.delete("/carreras/:idCarrera", eliminar);

//actualizar
router.put("/carreras", actualizar);

//buscar todas
router.get("/carreras", buscarCarreras);

//buscar una por ID
router.get("/carreras/:idCarrera", buscarPorId);

module.exports = router;