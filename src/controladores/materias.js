const materiaBD = require("../baseDeDatos/materiaBD");

buscarPorId = async (req, res) => {
  try {
    const idMateria = req.params.idMateria;

    if (!idMateria) {
      res
        .status(404)
        .json({ estado: "FALLO", msj: "No se especifico el id de la materia" });
    }

    const materia = await materiaBD.buscarPorId(idMateria);

    res.json({ estado: "OK", msj: materia });
  } catch (exec) {
    throw exec;
  }
};

buscarPorNombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;

    if (!nombre) {
      res
        .status(404)
        .json({ estado: "FALLO", msj: "No se especifico el id de la materia" });
    }

    const materias = await materiaBD.buscarPorNombre(nombre);

    res.json({ estado: "OK", msj: materias, dato: materias });
  } catch (exec) {
    throw exec;
  }
};

buscarMaterias = async (req, res) => {
  try {
    const materia = await materiaBD.buscarTodas();

    res.json({ estado: "OK", dato: materia });
  } catch (exec) {
    throw exec;
  }
};

// buscarMateria = async(req, res) => {
//     try{
//         const materia = await materiaBD.buscarMateria();

//         res.json({estado: 'OK', dato: materia });

//     }catch (exec){
//         console.log('Aca hay un fallo')
//         throw exec;
//     }
// }

eliminar = async (req, res) => {
  const idMateria = req.params.idMateria;

  if (!idMateria) {
    res
      .status(404)
      .json({ estado: "FALLO", msj: "No se especificó el id de la materia" });
  } else {
    try {
      await materiaBD.eliminar(idMateria);
      res.status(200).json({ estado: "OK", msj: "Materia eliminada" });
    } catch (error) {
      console.log(error);
    }
  }
};

 crear = async (req,res) => {
     const {nombre, horasSemanales, tipoMateria} = req.body;

     if(!nombre || !horasSemanales || !tipoMateria) {

         res.status(404).json({estado:'FALLA', msj:'Faltan completar datos obligatorios de la materia' });

     } else {
         const materia = {
             nombre: nombre,
             horasSemanales: horasSemanales,
             tipoMateria: tipoMateria
         };

         try {
             const materiaNueva = await materiaBD.crear(materia);
             res.status(201).json({estado:'OK', msj:'Materia creada', data: materiaNueva});
         } catch (ex) {
             console.log(ex);
         }
     }
 }

 // actualizar = async (req, res) => {

//     const {idMateria, nombre, horasSemanales, carrera} = req.body;

//     if (!idMateria|| !nombre || !horasSemanales || !carrera) {
//         res.status(400).json({ estado: "FALLO", msj: "Falta completar datos obligatorios de la materia" });
//     } else {

//         const datosActualizados = {
//             nombre: nombre,
//             horasSemanales: horasSemanales,
//             carrera: carrera
//         };

//         try {
//             const resultado = await materiaBD.actualizar(idMateria, datosActualizados);

//             res.status(200).json({ estado: "OK", msj: "Materia actualizada", dato: resultado})
//         } catch (ex) {
//             console.error(ex);
//             res.status(500).json({ estado: "FALLO", msj: "Error en el sistema" });
//         }
//     }
// };

module.exports = {
  buscarPorId,
  buscarPorNombre,
  buscarMaterias,
  eliminar,
  crear,
  /*  actualizar */
};
