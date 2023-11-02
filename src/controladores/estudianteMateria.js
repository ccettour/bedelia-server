const estudianteMateriaBD = require("../baseDeDatos/estudianteMateriaBD");

inscribir = async (req, res) => {

    const { materia, estudiante } = req.body;

    if (!materia || !estudiante) {
        res.status(404).json({ estado: "FALLO", msj: "Debe indicar el estudiante y la materia" });

    } else {
        try {
            const inscripcionEnMateria = await estudianteMateriaBD.altaInscripcion(estudiante, materia);
            res.status(201).json({ estado: "OK", msj: "Inscripción realizada", dato: inscripcionEnMateria });
        } catch (ex) {
            console.log(ex);
        }
    }
}

anularInscripcion = async (req, res) => {

    const { materia, estudiante } = req.body;

    if (!materia || !estudiante) {
        res.status(404).json({ estado: "FALLO", msj: "Debe indicar el estudiante y la materia" });

    } else {
        try {
            const anulada = await estudianteMateriaBD.bajaInscripcion(estudiante, materia);
            res.status(201).json({ estado: "OK", msj: "Inscripción anulada", dato: anulada });
        } catch (ex) {
            console.log(ex);
        }
    }
}

inscriptosPorMateria = async (req, res) => {
    const { idMateria } = req.params;

    try {
        const inscriptos = await estudianteMateriaBD.inscriptosMateriaPorIdMateria(idMateria);
        res.status(201).json({ estado: "OK", dato: inscriptos });
    } catch (exec) {
        throw exec;
    }
};

materiasInscriptoEst = async (req, res) => {
    const { idEstudiante } = req.params;

    try {
        const materias = await estudianteMateriaBD.materiasInscripto(idEstudiante);
        res.status(201).json({ estado: "OK", dato: materias })
    } catch (e) {
        throw e;
    }
}

materiasNoInscriptoEst = async (req, res) => {
    const { idEstudiante } = req.params;

    try {
        const materias = await estudianteMateriaBD.materiasNoInscripto(idEstudiante);
        res.status(201).json({ estado: "OK", dato: materias })
    } catch (e) {
        throw e;
    }
}

module.exports = {
    inscribir,
    anularInscripcion,
    inscriptosPorMateria,
    materiasInscriptoEst,
    materiasNoInscriptoEst
}

