const Router = require("express");

const {nueva, inscriptosPorCarrera} = require("../../controladores/estudianteCarrera");

const router = Router();

router
    //Inscribir
  .post("/nueva", nueva)
    //Ver inscriptos
  .get("/estudianteCarrera/:idCarrera", inscriptosPorCarrera);

module.exports = router;
