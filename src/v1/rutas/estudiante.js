const { Router } = require("express");
const { upload } = require('../../controladores/subirArchivo');
const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require("../../controladores/estudiantes");



const router = Router();

//crear
router.post("/estudiantes", upload, crear);

//eliminar
router.delete("/estudiantes/:idEstudiante", eliminar);

//actualizar
router.put("/estudiantes", actualizar);

//buscar
router.get("/estudiantes", buscarTodos);

//buscarPorID
router.get("/estudiantes/:idEstudiante", buscarPorId);

module.exports = router;