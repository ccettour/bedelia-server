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
  //console.log(materia);

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
const crear = async (materia, idCarrera) => {
  const consulta = "INSERT INTO materia SET ?";
  const [materiaNueva] = await conexion.query(consulta, materia);

  if (idCarrera > 0) {
    const cons =
      "INSERT INTO carreramateria(idCarrera, idMateria) VALUES (?,?)";
    const [asignacion] = await conexion.query(cons, [
      idCarrera,
      materiaNueva.insertId,
    ]);
  }

  //return materiaNueva;
  return buscarPorId(materiaNueva.insertId);
};

const actualizar = async (idMateria, nuevosDatos, idCarrera) => {

  //Agregar todo el tema de transacción
  const consulta =
    "UPDATE materia SET horasSemanales=?,nombre=?,tipoMateria=? WHERE idMateria=?";
  const { horasSemanales, nombre, tipoMateria } = nuevosDatos;
  try {
    const [resultado] = await conexion.query(consulta, [
      horasSemanales,
      nombre,
      tipoMateria,
      idMateria,
    ]);

    const [existe] = await conexion.query(
      "SELECT 1 FROM carreramateria WHERE idCarrera = ? AND idMateria = ?",
      [idCarrera, idMateria]
    );

    const [desactivarTodas] = await conexion.query(
      "UPDATE carreramateria SET activo=0 WHERE idMateria = ?",
      [idMateria]
    );

    if (existe.length > 0) {
      const [activarNueva] = await conexion.query(
        "UPDATE carreramateria SET activo=1 WHERE idCarrera = ? AND idMateria = ?",
        [idCarrera, idMateria]
      );
    } else {
      if (idCarrera > 0) {
        const [crear] = await conexion.query(
          "INSERT INTO carreramateria(idCarrera, idMateria) VALUES (?,?)",
          [idCarrera, idMateria]
        );
      }
    }
    return buscarPorId(idMateria);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarPorId,
  buscarPorNombre,
  buscarTodas,
  eliminar,
  crear,
  actualizar,
};
