const estudianteCarreraBD = require("../baseDeDatos/estudianteCarreraBD");


nueva = async (req, res) => {
    
    const { carrera, estudiante } = req.body;

    if (!carrera || !estudiante) {
        res.status(404).json({ estado: "FALLO", msj: "Debe indicar el estudiante y la carrera" });

    } else {
        try {
            const inscripcionEnCarrera = await estudianteCarreraBD.altaInscripcion(estudiante, carrera);
            res.status(201).json({ estado: "OK", msj: "Inscripción realizada", dato: inscripcionEnCarrera });
        } catch (ex) {
            console.log(ex);
        }
    }
}

anularInscripcion = async (req, res) => {
    
    const { carrera, estudiante } = req.body;

   if (!carrera || !estudiante) {
        res.status(404).json({ estado: "FALLO", msj: "Debe indicar el estudiante y la carrera" });

    } else {
        try {
            const anulada = await estudianteCarreraBD.bajaInscripcion(estudiante, carrera);
            res.status(201).json({ estado: "OK", msj: "Inscripción anulada", dato: anulada });
        } catch (ex) {
            console.log(ex);
        }
    }
}

inscriptosPorCarrera = async (req, res) => {
    const {idCarrera} = req.params;

    try{
        const inscriptos = await estudianteCarreraBD.inscriptosCarreraPorIdCarrera(idCarrera);
        res.status(201).json({estado:"OK", dato:inscriptos});
    }catch (exec){
        throw exec;
    }
};

carrerasInscriptoEst = async (req, res) => {
    const {idEstudiante} = req.params;

    try{
        const carreras = await estudianteCarreraBD.carrerasInscripto(idEstudiante);
        res.status(201).json({estado:"OK", dato:carreras})
    }catch(e){
        throw e;
    }
}

carrerasNoInscriptoEst = async (req, res) => {
    const {idEstudiante} = req.params;

    try{
        const carreras = await estudianteCarreraBD.carrerasNoInscripto(idEstudiante);
        res.status(201).json({estado:"OK", dato:carreras})
    }catch(e){
        throw e;
    }
}

module.exports = {
    nueva,
    anularInscripcion,
    inscriptosPorCarrera,
    carrerasInscriptoEst,
    carrerasNoInscriptoEst
}

