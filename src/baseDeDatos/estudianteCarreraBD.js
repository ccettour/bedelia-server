const conexion = require("./conexionBD");

const inscriptosCarreraPorIdCarrera = async (idCarrera) => {
  const consulta =
    "SELECT e.idEstudiante, e.dni, e.nombre, e.apellido, e.correoElectronico " +
    "FROM estudiante AS e " +
    "INNER JOIN estudiantecarrera AS ec ON ec.estudiante = e.idEstudiante " +
    "INNER JOIN carrera AS c ON c.idCarrera = ec.carrera " +
    "WHERE c.activo = 1 AND e.activo = 1 AND ec.fechaBaja IS NULL AND ec.carrera=?;";

  const [inscriptos] = await conexion.query(consulta, idCarrera);

  return inscriptos;
};

const altaInscripcion = async (idEstudiante, idCarrera) => {
  /* const consulta =
    "INSERT INTO estudiantecarrera(estudiante, carrera, fechaAlta) VALUES (?,?,NOW())";
  const [inscripcionCarrera] = await conexion.query(consulta, idEstudiante, idCarrera);

  return inscripcionCarrera; */
};

const bajaInscripcion = async (idInscripcion) => {};

module.exports = {
  inscriptosCarreraPorIdCarrera,
};
