const conexion = require('./conexionBD');


const estadistica = async (materia) => {
    const consulta = 'call procEstadistica2()';
    
    const [results] = await conexion.query(consulta,[materia]);    
    
    // console.log(results);


    const cantidad = results[0];
    return cantidad;
}


const estadistica2 = async (carrera) => {
    const consulta = 'call procEstadistica2()';
    
    const [results] = await conexion.query(consulta,[carrera]);    
    
    // console.log(results);


    const cantidad = results[0];
    return cantidad;
}




const estadistica3 = async (estudiante) => {
    const consulta = 'call procEstadistica2()';
    
    const [results] = await conexion.query(consulta,[estudiante]);    
    
    // console.log(results);


    const cantidad = results[0];
    return ;
}




module.exports = {
    estadistica,
    estadistica2,
    estadistica3
}
