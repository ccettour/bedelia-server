const Router = require("express");

const { inscribir, anularInscripcion, inscriptosPorMateria, materiasInscriptoEst, materiasNoInscriptoEst } = require("../../controladores/estudianteMateria");

const router = Router();

//Inscribir
router.post("/inscripcionMateria", inscribir);

//Desinscribir
router.put("/inscripcionMateria", anularInscripcion);

//Ver alumnos inscriptos a carrera
router.get("/estudianteMateria/:idMateria", inscriptosPorMateria);

//Ver carreras en las que está inscripto
router.get("/materiasInscripto/:idEstudiante", materiasInscriptoEst);

//Ver carreras en las que NO está inscripto
router.get("/materiasNoInscripto/:idEstudiante", materiasNoInscriptoEst);

module.exports = router;