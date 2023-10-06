const { Router } = require("express");
const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require("../../controladores/estudiantes");



const router = Router();

//crear
router.post("/estudiantes", crear);

//eliminar
router.delete("/estudiantes/:idEstudiante", eliminar);

//actualizar
router.put("/estudiantes", actualizar);

//buscar
router.get("/estudiantes", buscarTodos);

//buscarPorID
router.get("/estudiantes/:idEstudiante", buscarPorId);

module.exports = router;