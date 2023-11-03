const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    // console.log(results);

    const datos = {
        mas30 : results[0][0].mas30,
        cantidadInscriptos : results[0][0].cantidadInscriptos
    }
    return datos;
}

const estadistica2 = async (carrera) => {
    const consulta = 'call datosPdf(?)';
    
    const [results] = await conexion.query(consulta,[carrera]);    
    
    // console.log(results);


    const inscriptos = results[0];
    return inscriptos;
}

module.exports = {
    estadistica,
    estadistica2
}
