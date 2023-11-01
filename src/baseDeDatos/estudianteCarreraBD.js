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

const carrerasInscripto = async (idEstudiante) => {
  const consulta = 
    "SELECT c.idCarrera, c.nombre FROM estudiantecarrera AS ec " +
    "JOIN carrera AS c ON c.idCarrera = ec.carrera " +
    "WHERE ec.estudiante = ? AND fechaBaja IS NULL";

  const [carreras] = await conexion.query(consulta, idEstudiante);

  return carreras;
};

const carrerasNoInscripto = async (idEstudiante) => {
  const consulta =
    "SELECT idCarrera, nombre FROM carrera AS c "+
    "WHERE c.activo = 1 AND c.idCarrera NOT IN "+
    "(SELECT carrera FROM estudiantecarrera where estudiante = ?);";

  const [carreras] = await conexion.query(consulta, idEstudiante);

  return carreras;
};

const altaInscripcion = async (idEstudiante, idCarrera) => {
  const consulta =
    "INSERT INTO estudiantecarrera(estudiante, carrera, fechaAlta) VALUES (?,?,NOW())";
  const [inscripcionCarrera] = await conexion.query(consulta, [idEstudiante, idCarrera]);

  return inscripcionCarrera;
};

const bajaInscripcion = async (idEstudiante, idCarrera) => {
  const consulta =
    "UPDATE estudiantecarrera SET fechaBaja=NOW() WHERE estudiante=? AND carrera=?;";
  const [inscripcionCarrera] = await conexion.query(consulta, [idEstudiante, idCarrera]);

  return inscripcionCarrera;
};

module.exports = {
  inscriptosCarreraPorIdCarrera,
  carrerasNoInscripto,
  carrerasInscripto,
  altaInscripcion,
  bajaInscripcion
};
