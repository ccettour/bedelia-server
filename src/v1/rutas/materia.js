const { Router } = require("express");

const {
  buscarPorId,
  buscarPorNombre,
  crear,
  eliminar,
  buscarMaterias,
  actualizar,
} = require("../../controladores/materias");

const router = Router();

// crear
router.post("/materias", crear);

//eliminar
router.delete("/materias/:idMateria", eliminar);

// //actualizar
// router.put('/materia/:idMateria',actualizar);

//buscar
router.get("/materias", buscarMaterias);

//buscar por id
router.get("/materia/:idMateria", buscarPorId);

//buscar por nombre
router.get("/materias/:nombre", buscarPorNombre);

module.exports = router;
