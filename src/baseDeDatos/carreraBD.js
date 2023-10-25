const conexion = require("./conexionBD");

////////////////////////////BUSCAR POR ID////////////////////////////
const buscarPorIdCarrera = async (idCarrera) => {
    const consulta = "SELECT nombre, modalidad," +
     "FROM carrera" +
    "WHERE activo = 1 AND idCarrera =?";
  
    const [carrera] = await conexion.query(consulta, idCarrera);
    console.log(carrera)
    return carrera;
  };



  ////////////////////////////BUSCAR TODAS LAS CARRERAS////////////////////////////
  const buscarCarreras = async () => {
    const consulta = "SELECT nombre, modalidad," +
     "FROM carrera" +
    "WHERE activo = 1 AND idCarrera =?";
  
    const [carreras] = await conexion.query(consulta);
    console.log(carreras)
    return carreras;
  };



////////////////////////////ELIMINAR CARRERA////////////////////////////
const eliminarCarrera = async (idCarrera)=>{
    const consulta = 'UPDATE carrera SET activo = 0 WHERE idCarrera = ?';
    await conexion.query(consulta, [idCarrera]);
}




////////////////////////////CREAR CARRERA////////////////////////////
const crearCarrera = async (carrera) =>{
    const consulta = 'INSERT INTO carrera SET ?';
    const [carreraNueva] = await conexion.query(consulta,carrera);
  
    return carreraNueva;
  }
  


////////////////////////////ACTUALIZAR CARRERA////////////////////////////
const actualizarCarrera = async (idCarrera, nuevosDatos) =>{
  const consulta = 'UPDATE carrera SET nombre=?,modalidad=? WHERE idCarrera=?';
  
  const {nombre,modalidad}=nuevosDatos;
  try {
    const [resultado] = await conexion.query(consulta, [nombre, modalidad,idCarrera]);

    return buscarPorIdCarrera(idCarrera);
  } catch (error) {
    throw error;
  }
};







  module.exports ={
    buscarPorIdCarrera,
    buscarCarreras,
    eliminarCarrera,
    crearCarrera,
    actualizarCarrera
  }
