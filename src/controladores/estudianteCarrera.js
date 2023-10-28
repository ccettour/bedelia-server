const estudianteCarreraBD = require('../baseDeDatos/estudianteCarreraBD');


nueva = async (req, res) => {
    const {idCarrera, idEstudiante} = req.body;
    try{
        const inscripcion = await estudianteCarreraBD.nueva(idCarrera,idEstudiante);
        res.status(201).json({estado:'OK', msj:'Estudiante inscripto'});
    }catch (exec){
        throw exec;
    }
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

