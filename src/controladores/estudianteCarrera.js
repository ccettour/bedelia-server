const estudianteCarreraBD = require('../baseDeDatos/estudianteCarreraBD');


nueva = async (req, res) => {
    /* const { idCarrera, idEstudiante } = req.body;

    if (!idCarrera || !idEstudiante) {
        res.status(404).json({ estado: "FALLO", msj: "Debe indicar el estudiante y la carrera" });

    } else {
        try {
            const inscripcionEnCarrera = await estudianteCarreraBD.altaInscripcion(idEstudiante, idCarrera);
            res.status(201).json({ estado: "OK", msj: "Carrera creada", dato: inscripcionEnCarrera });
        } catch (ex) {
            console.log(ex);
        }
    } */
}

inscriptosPorCarrera = async (req, res) => {
    const {idCarrera} = req.params;

    try{
        const inscriptos = await estudianteCarreraBD.inscriptosCarreraPorIdCarrera(idCarrera);
        res.status(201).json({estado:'OK', dato:inscriptos});
    }catch (exec){
        throw exec;
    }
};

module.exports = {
    nueva,
    inscriptosPorCarrera,
}

