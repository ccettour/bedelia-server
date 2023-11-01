const Router = require("express");

const { nueva, anularInscripcion, inscriptosPorCarrera, carrerasInscriptoEst, carrerasNoInscriptoEst } = require("../../controladores/estudianteCarrera");

const router = Router();

//Inscribir
router.post("/inscripcionCarrera", nueva);

//Desinscribir
router.put("/inscripcionCarrera", anularInscripcion);

//Ver alumnos inscriptos a carrera
router.get("/estudianteCarrera/:idCarrera", inscriptosPorCarrera);

//Ver carreras en las que está inscripto
router.get("/carrerasInscripto/:idEstudiante", carrerasInscriptoEst);

//Ver carreras en las que NO está inscripto
router.get("/carrerasNoInscripto/:idEstudiante", carrerasNoInscriptoEst);

module.exports = router;