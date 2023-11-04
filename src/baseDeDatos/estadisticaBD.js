const conexion = require('./conexionBD');


const estadistica = async (materia) => {
    const consulta = 'call procEstadistica2()';
    
    const [results] = await conexion.query(consulta,[materia]);    
    
    // console.log(results);

    const cantidad = results[0];
    return cantidad;
}


module.exports = {
    estadistica
}
