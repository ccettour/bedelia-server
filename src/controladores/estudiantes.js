const estudianteBD = require("../baseDeDatos/estudianteBD");

buscarPorId = async(req, res) => {
    try{
        const idEstudiante = req.params.idEstudiante;

        if(!idEstudiante){
            res.status(404).json({estado:'FALLO', msj:'Falta el id' })
        }

        const estudiante = await estudianteBD.buscarPorID(idEstudiante);
        
        res.json({estado:"OK", msj:estudiante});
        
    } catch (exec){
        throw exec;
    }
}

module.exports = {
    buscarPorId,
}