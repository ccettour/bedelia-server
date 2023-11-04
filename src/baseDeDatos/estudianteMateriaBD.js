const conexion = require("./conexionBD");

const inscriptosMateriaPorIdMateria = async (idMateria) => {
  const consulta =
    "SELECT e.idEstudiante, e.dni, e.nombre, e.apellido, e.correoElectronico "+
    "FROM estudiante AS e "+
    "INNER JOIN estudiantemateria AS em ON em.estudiante = e.idEstudiante "+
    "INNER JOIN materia AS m ON m.idMateria = em.materia "+
    "WHERE m.activo = 1 AND e.activo = 1 AND em.materia=?;";

  const [inscriptos] = await conexion.query(consulta, idMateria);

  return inscriptos;
};

const materiasInscripto = async (idEstudiante) => {
  const consulta = 
    "SELECT m.idMateria, m.nombre FROM estudiantemateria AS em "+
    "JOIN materia AS m ON m.idMateria = em.materia " +
    "WHERE em.estudiante = ? ";

  const [materias] = await conexion.query(consulta, idEstudiante);

  return materias;
};

const materiasNoInscripto = async (idEstudiante) => {
  const consulta = "SELECT DISTINCT m.idMateria, m.nombre "+
  "FROM materia AS m "+
  "JOIN carreramateria AS cm ON cm.idMateria = m.idMateria "+
  "JOIN carrera AS c ON c.idCarrera = cm.idCarrera "+
  "WHERE c.idCarrera IN ( "+
  "    SELECT ec.carrera "+
  "    FROM estudiantecarrera AS ec "+
  "    WHERE ec.estudiante = ? AND ec.fechaBaja IS NULL"+
  ") "+
  "AND m.idMateria NOT IN ( "+
  "    SELECT em.materia "+
  "    FROM estudiantemateria AS em "+
  "    WHERE em.estudiante = ? "+
  ");";

  const [carreras] = await conexion.query(consulta, [idEstudiante,idEstudiante]);

  return carreras;
};

const altaInscripcion = async (idEstudiante, idMateria) => {
  const consulta =
    "INSERT INTO estudiantemateria(fecha, estudiante, materia) VALUES (NOW(),?,?)";
  const [inscripcionMateria] = await conexion.query(consulta, [idEstudiante, idMateria]);

  return inscripcionMateria;
};

const bajaInscripcion = async (idEstudiante, idMateria) => {

  const consulta =
    "DELETE FROM estudiantemateria WHERE estudiante = ? AND materia = ?;";
  const eliminada = await conexion.query(consulta, [idEstudiante, idMateria]);

  return eliminada;
  
};

module.exports = {
  inscriptosMateriaPorIdMateria,
  bajaInscripcion,
  altaInscripcion,
  materiasInscripto,
  materiasNoInscripto
};
