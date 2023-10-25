const carreraBD = require("../baseDeDatos/carreraBD");

////////////////////////////BUSCAR POR ID////////////////////////////
buscarPorIdCarrera = async (req, res) => {
    try {
        const idcarrera = req.params.idcarrera;

        if (!idcarrera) {
            res.status(404).json({ estado: "FALLO", msj: "No se especificó id de la carrera" })
        }

        const carrera = await carreraBD.buscarPorIdCarrera(idcarrera);

        res.json({ estado: "OK", msj: carrera });

    } catch (exec) {
        throw exec;
    }

}
  ////////////////////////////BUSCAR TODAS LAS CARRERAS////////////////////////////
buscarCarreras = async (req, res) => {
    try {
        const carrera = await carreraBD.buscarCarreras();

        res.json({ estado: "OK", dato: carrera });
    } catch (exec) {
        throw exec;

    }

}


////////////////////////////ELIMINAR CARRERA////////////////////////////
eliminarCarrera = async (req, res) => {
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
crearCarrera = async (req, res) => {
    const { nombre,modalidad } = req.body;

    if (!nombre|| !modalidad) {
        res.status(404).json({ estado: "FALLO", msj: "Faltan datos obligatorios" });

    } else {
        const carrera = {
            nombre:nombre,
            modalidad: modalidad
        };

        try {
            const carreraNueva = await carreraBD.crearCarrera(carrera);
            res.status(201).json({ estado: "OK", msj: "Carrera creada", dato: carreraNueva });
        } catch (ex) {
            console.log(ex);
        }
    }
}



////////////////////////////ACTUALIZAR CARRERA////////////////////////////
actualizarCarrera= async (req, res) => {
    
    const {idCarrera,nombre,modalidad,} = req.body;

    if (!idCarrera || !nombre || modalidad) {
        res.status(400).json({ estado: "FALLO", msj: "Falta completar datos para actualizar la carrera" });
    } else {
        // Filtrar los datos a actualizar según los campos proporcionados en camposAActualizar
        const datosActualizados = {
            nombre:nombre,
            modalidad:modalidad,
        };

        try {
            const resultado = await carreraBD.actualizarCarrera(idCarrera, datosActualizados);
            
            res.status(200).json({ estado: "OK", msj: "Carrera actualizada", dato: resultado})
        } catch (ex) {
            console.error(ex);
            res.status(500).json({ estado: "FALLO", msj: "Error en el sistema" });
        }
    }
};











module.exports ={
    buscarPorIdCarrera,
    buscarCarreras,
    eliminarCarrera,
    crearCarrera,
    actualizarCarrera
}