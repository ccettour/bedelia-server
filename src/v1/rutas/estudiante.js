const { Router } = require("express");
const { buscarPorId } = require("../../controladores/estudiantes");



const router = Router();
/*
//crear
router.post("/estudiantes");

//eliminar
router.delete("/estudiantes/:idEstudiante");

//actualizar
router.put("/estudiantes/:idEstudiante");

//buscar
router.get("/estudiantes");
*/

//buscarPorID
router.get("/estudiantes/:idEstudiante", buscarPorId);

module.exports = router;