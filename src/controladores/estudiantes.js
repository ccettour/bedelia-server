const estudianteBD = require("../baseDeDatos/estudianteBD");

////////////////////////////BUSCAR POR ID////////////////////////////
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


////////////////////////////BUSCAR TODOS////////////////////////////
buscarTodos = async (req,res) =>{
    try {
        const estudiante = await estudianteBD.buscarTodos();

        res.json ({ estado: 'OK', dato: estudiante});
    }catch (exec){
        throw exec;

    }
    
}


////////////////////////////ELIMINAR ESTUDIANTE////////////////////////////
eliminar = async (req,res) =>{
    const idEstudiante = req.params.idEstudiante;


    if(!idEstudiante){
        res.status(404).json({estado: 'FALLO', msj: 'no se especifico el id del estudiante'});

    }else {
        try{
            await estudianteBD.eliminar(idEstudiante);
            res.status(200).json({estado: 'OK', msj:'Estudiante eliminado'});
        }catch(error){
            console.log(error);
        }
    }        
}


////////////////////////////CREAR ESTUDIANTE////////////////////////////
crear = async (req,res)=>{
    const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto} = req.body;

    if (!dni || !nombre || !apellido || !nacionalidad || !correoElectronico){
        res.status(404).json({estado:"FALLO", msj:"Faltan datos obligatorios"});

    }else{
        const estudiante = {
            dni:dni, 
            nombre:nombre, 
            apellido:apellido, 
            fechaNacimiento:fechaNacimiento, 
            nacionalidad:nacionalidad,
            correoElectronico:correoElectronico,
            celular:celular,
            foto:foto
        };

        try{
            const estudianteNuevo = await estudianteBD.crear(estudiante);
            res.status(201).json({estado:'OK', msj:'Estudiante creado', dato:estudianteNuevo});
        }catch (ex){
            console.log(ex);
        }
    }

}


////////////////////////////ACTUALIZAR ESTUDIANTE////////////////////////////
actualizar = async (req,res)=>{
    const {idEstudiante} =req.params;
    const nuevosDatos = req.body;

    if (!idEstudiante || Object.keys(nuevosDatos).legth ===0) {
        res.status(404).json({estado:'FALLO', msj:'Falta seleccionar ID del estudiante que desea modificar'});
    }else {
        try{
            const resultado = await estudianteBD.actualizar(idEstudiante , nuevosDatos);
            if (resultado.affectedRows ===1){
                res.status(200).json({ estado:'OK', msj:'Estudiante modificado'});

            }else {
                res.status(404).json({estado:'FALLO', msj:'El estudiante no existe'});

            }

        }catch (ex){
            console.error(ex);
            res.status(500).json({estado:'FALLO', msj:'Error en el sistema'});

        }

    }


};


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
    actualizar
}