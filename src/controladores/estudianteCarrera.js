const estudianteCarreraBD = require('../baseDatos/estudianteCarreraBD');


nueva = async (req, res) => {
    const {idCarrera, idEstudiante} = req.body;
    try{
        const inscripcion = await estudianteCarreraBD.nueva(idCarrera,idEstudiante);
        res.status(201).json({estado:'OK', msj:'Estudiante inscripto'});
    }catch (exec){
        throw exec;
    }
}

EstudiantesCarreraPorIdCarrera = async (req, res) => {
    const {idCarrera} = req.params;

    try{
        const inscriptos = await estudianteCarreraBD.EstudiantesCarreraPorIdCarrera(idCarrera);
        res.status(201).json({estado:'OK', dato:inscriptos});
    }catch (exec){
        throw exec;
    }
}

module.exports = {
    nueva,
    EstudiantesCarreraPorIdCarrera,
}

