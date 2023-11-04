const estudianteBD = require("../baseDeDatos/estudianteBD");

////////////////////////////BUSCAR POR ID////////////////////////////
buscarPorId = async (req, res) => {
    try {
        const idEstudiante = req.params.idEstudiante;

        if (!idEstudiante) {
            res.status(404).json({ estado: "FALLO", msj: "No se especificó el id del estudiante" })
        }

        const estudiante = await estudianteBD.buscarPorID(idEstudiante);

        res.json({ estado: "OK", msj: estudiante });

    } catch (exec) {
        throw exec;
    }
}


////////////////////////////BUSCAR TODOS////////////////////////////
buscarTodos = async (req, res) => {
    try {
        const estudiante = await estudianteBD.buscarTodos();

        res.json({ estado: "OK", dato: estudiante });
    } catch (exec) {
        throw exec;

    }

}


////////////////////////////ELIMINAR ESTUDIANTE////////////////////////////
eliminar = async (req, res) => {
    const idEstudiante = req.params.idEstudiante;


    if (!idEstudiante) {
        res.status(404).json({ estado: "FALLO", msj: "No se especificó el id del estudiante"});

    } else {
        try {
            await estudianteBD.eliminar(idEstudiante);
            res.status(200).json({ estado: "OK", msj: "Estudiante eliminado" });
        } catch (error) {
            console.log(error);
        }
    }
}


////////////////////////////CREAR ESTUDIANTE////////////////////////////
crear = async (req, res) => {
    const { dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular} = req.body;

    let filename;
    if(!req.file){
        filename = 'default.png'; 
    }else{
        filename = req.file.filename; 
    }

    if (!dni || !nombre || !apellido || !nacionalidad || !correoElectronico) {
        res.status(404).json({ estado: "FALLO", msj: "Faltan datos obligatorios" });

    } else {
        const estudiante = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            nacionalidad: nacionalidad,
            correoElectronico: correoElectronico,
            celular: celular,
            foto: filename
        };

        try {
            const estudianteNuevo = await estudianteBD.crear(estudiante);
            res.status(201).json({ estado: "OK", msj: "Estudiante creado", dato: estudianteNuevo });
        } catch (ex) {
            console.log(ex);
        }
    }
}


////////////////////////////ACTUALIZAR ESTUDIANTE////////////////////////////
actualizar = async (req, res) => {
    
    const {idEstudiante,dni,nombre,apellido,fechaNacimiento, nacionalidad,correoElectronico,celular,foto } = req.body;

    if (!idEstudiante || !dni || !nombre || !apellido || !nacionalidad || !correoElectronico) {
        res.status(400).json({ estado: "FALLO", msj: "Falta completar datos obligatorios del estudiante" });
    } else {
        // Filtrar los datos a actualizar según los campos proporcionados en camposAActualizar
        const datosActualizados = {
            dni:dni,
            nombre:nombre,
            apellido:apellido,
            fechaNacimiento: fechaNacimiento,
            nacionalidad: nacionalidad,
            correoElectronico: correoElectronico,
            celular: celular,
            foto: foto
        };

        try {
            const resultado = await estudianteBD.actualizar(idEstudiante, datosActualizados);
            
            res.status(200).json({ estado: "OK", msj: "Estudiante actualizado", dato: resultado})
        } catch (ex) {
            console.error(ex);
            res.status(500).json({ estado: "FALLO", msj: "Error en el sistema" });
        }
    }
};


////////////////////////////BUSCAR POR CRITERIO////////////////////////////
buscarCritero = async (req, res) => {
    
    const criterio = req.params.criterio;

    if (!criterio) {
        res.status(404).json({ estado: "FALLO", msj: "No se especificó el criterio de búsqueda"});

    } else {
        try {
            const resultado = await estudianteBD.buscarPorCriterio(criterio);
            res.status(200).json({ estado: "OK", dato: resultado });
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
    actualizar,
    buscarCritero
}