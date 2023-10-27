const carreraBD = require("../baseDeDatos/carreraBD");

////////////////////////////BUSCAR CARRERA POR ID////////////////////////////
buscarPorId = async (req, res) => {
    try {
        const idCarrera = req.params.idCarrera;

        if (!idCarrera) {
            res.status(404).json({ estado: "FALLO", msj: "No se especificó el id de la carrera" })
        }

        const carrera = await carreraBD.buscarPorID(idCarrera);

        res.json({ estado: "OK", msj: carrera });

    } catch (exec) {
        throw exec;
    }
}


////////////////////////////BUSCAR TODAS LAS CARRERAS////////////////////////////
buscarTodas = async (req, res) => {
    try {
        const carrera = await carreraBD.buscarTodas();

        res.json({ estado: "OK", dato: carrera });
    } catch (exec) {
        throw exec;
    }
}


////////////////////////////ELIMINAR CARRERA////////////////////////////
eliminar = async (req, res) => {
    const idCarrera = req.params.idCarrera;


    if (!idCarrera) {
        res.status(404).json({ estado: "FALLO", msj: "No se especificó el id de la carrera"});

    } else {
        try {
            await carreraBD.eliminar(idCarrera);
            res.status(200).json({ estado: "OK", msj: "Carrera eliminada" });
        } catch (error) {
            console.log(error);
        }
    }
}


////////////////////////////CREAR CARRERA////////////////////////////
crear = async (req, res) => {
    const { nombre, modalidad } = req.body;

    if (!nombre || !modalidad) {
        res.status(404).json({ estado: "FALLO", msj: "Falta completar datos obligatorios de la carrera" });

    } else {
        const carrera = {
            nombre: nombre,
            modalidad: modalidad
        };

        try {
            const carreraNueva = await carreraBD.crear(carrera);
            res.status(201).json({ estado: "OK", msj: "Carrera creada", dato: carreraNueva });
        } catch (ex) {
            console.log(ex);
        }
    }
}


////////////////////////////ACTUALIZAR CARRERA////////////////////////////
actualizar = async (req, res) => {
    
    const {idCarrera,nombre,modalidad } = req.body;

    if (!idCarrera || !nombre || !modalidad) {
        res.status(400).json({ estado: "FALLO", msj: "Falta completar datos obligatorios de la carrera" });
    } else {
        // Filtrar los datos a actualizar según los campos proporcionados en camposAActualizar
        const datosActualizados = {
            nombre:nombre,
            modalidad: modalidad
        };

        try {
            const resultado = await carreraBD.actualizar(idCarrera, datosActualizados);
            
            res.status(200).json({ estado: "OK", msj: "Carrera actualizada", dato: resultado})
        } catch (ex) {
            console.error(ex);
            res.status(500).json({ estado: "FALLO", msj: "Error en el sistema" });
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