const conexion = require("./conexionBD");

////////////////////////////BUSCAR POR ID////////////////////////////

const buscarPorId = async (idMateria) => {
  const consulta =
    "SELECT horasSemanales, nombre, " +
    "(CASE " +
    "  WHEN tipoMateria = 0 THEN 'anual' " +
    "  WHEN tipoMateria = 1 THEN 'cuatrimestral' " +
    "  ELSE '' " +
    "END) AS tipoMateria " +
    "FROM materia " +
    "WHERE activo = 1 AND idMateria = ?";

  const [materia] = await conexion.query(consulta, idMateria);
  //   console.log(materia);
  return materia;
};

////////////////////////////BUSCAR POR NOMBRE////////////////////////////

const buscarPorNombre = async (nombre) => {
  const nom = "%" + nombre + "%";
  const consulta =
    "SELECT horasSemanales, nombre, " +
    "(CASE " +
    "  WHEN tipoMateria = 0 THEN 'anual' " +
    "  WHEN tipoMateria = 1 THEN 'cuatrimestral' " +
    "  ELSE '' " +
    "END) AS tipoMateria " +
    "FROM materia " +
    "WHERE activo = 1 AND nombre LIKE ?";

    const [materia] = await conexion.query(consulta, nom);
    console.log(materia);

  return materia;
};

////////////////////////////BUSCAR TODAS////////////////////////////
const buscarTodas = async () => {
  const consulta =
    "SELECT idMateria, horasSemanales, nombre, " +
    "(CASE " +
    "  WHEN tipoMateria = 0 THEN 'anual' " +
    "  WHEN tipoMateria = 1 THEN 'cuatrimestral' " +
    "  ELSE '' " +
    "END) AS tipoMateria " +
    "FROM materia " +
    "WHERE activo = 1";

  const [materias] = await conexion.query(consulta);
  //   console.log(materias);
  return materias;
};

////////////////////////////ELIMINAR////////////////////////////
const eliminar = async (idMateria) => {
  const consulta = "UPDATE materia SET activo = 0 WHERE idMateria = ?";
  await conexion.query(consulta, [idMateria]);
};

////////////////////////////CREAR MATERIA////////////////////////////
const crear = async (materia) => {
  const consulta = "INSERT INTO materia SET ?";
  const [materiaNueva] = await conexion.query(consulta, materia);

  //return materiaNueva;
  return buscarPorId(materiaNueva.insertId);
};

// const actualizar = async (idMateria, nuevosDatos) => {
//     const consulta = "UPDATE carrera SET nombre=?,modalidad=? WHERE idCarrera=?";

//     const { nombre, horasSemanales, carrera } = nuevosDatos;
//     try {
//       const [resultado] = await conexion.query(consulta, [nombre, horasSemanales, carrera, idMateria]);

//       return buscarPorID(idMateria);

//     } catch (error) {
//       throw error;
//     }
//   };

module.exports = {
  buscarPorId,
  buscarPorNombre,
  buscarTodas,
  eliminar,
  crear,
  /* buscarMateria,
    actualizar */
};
