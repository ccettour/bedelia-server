const conexion = require('./conexionBD');

const inscriptosCarreraPorIdCarrera = async (idCarrera) => {
    const consulta = "SELECT e.idEstudiante, e.dni, e.nombre, e.apellido " +
    "FROM estudiante AS e " +
    "INNER JOIN estudiantecarrera AS ec ON ec.estudiante = e.idEstudiante " +
    "INNER JOIN carrera AS c ON c.idCarrera = ec.carrera " +
    "WHERE c.activo = 1 AND e.activo = 1 AND ec.fechaBaja IS NULL AND ec.carrera=?;";

    const [inscriptos] = await conexion.query(consulta,idCarrera);    

    return inscriptos;
}

//const bajaInscripcion = async()
    

module.exports = {
    inscriptosCarreraPorIdCarrera
}
