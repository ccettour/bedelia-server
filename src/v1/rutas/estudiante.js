const { Router } = require("express");
const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require("../../controladores/estudiantes");



const router = Router();

//crear  ANDA
router.post("/estudiantes", crear);

//eliminar   ANDA
router.delete("/estudiantes/:idEstudiante", eliminar);

//actualizar
router.put("/estudiantes/:idEstudiante", actualizar);

//buscar   ANDA
router.get("/estudiantes", buscarTodos);

//buscarPorID  ANDA
router.get("/estudiantes/:idEstudiante", buscarPorId);

module.exports = router;