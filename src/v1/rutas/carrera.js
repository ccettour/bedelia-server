const { Router } = require("express");
const { buscarPorIdCarrera,buscarCarreras,eliminarCarrera,crearCarrera,actualizarCarrera } = require("../../controladores/carreras");




const router = Router();

//crear
router.post("/carreras", crearCarrera);

//eliminar
router.delete("/carreras/:idcarrera", eliminarCarrera);

//actualizar
router.put("/carreras", actualizarCarrera);

//buscar
router.get("/carreras", buscarCarreras);

//buscarPorID
router.get("/carreras/:idcarrera", buscarPorIdCarrera);

module.exports = router;