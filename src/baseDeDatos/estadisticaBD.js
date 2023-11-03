const conexion = require('./conexionBD');

const estadistica = async () => {
    const consulta = 'call procEstadistica()';

    const [results] = await conexion.query(consulta);

    console.log(results);
    const inscripciones = results[1][0].inscripciones;
    const alumnos = results[0][0].alumnos;

    const datos = {
        alumnosActivos : alumnos,
        inscripciones : inscripciones
    }

    return datos;
}


module.exports = {
    estadistica
}