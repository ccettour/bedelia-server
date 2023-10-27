const conexion = require("./conexionBD");


////////////////////////////BUSCAR CARRERA POR ID////////////////////////////
const buscarPorID = async (idCarrera) => {
  const consulta =
    "SELECT nombre, "
  "(CASE " +
    "  WHEN modalidad = 0 THEN 'presencial' " +
    "  WHEN modalidad = 1 THEN 'virtual' " +
    "  ELSE '' " +
    "END) AS modalidad " +
    "FROM carrera " +
    "WHERE activo = 1 AND idCarrera = ?";

  const [carrera] = await conexion.query(consulta, idCarrera);
  console.log(carrera)
  return carrera;
};


////////////////////////////BUSCAR TODAS LAS CARRERAS////////////////////////////
const buscarCarreras = async () => {
  const consulta =
    "SELECT nombre, (CASE WHEN modalidad = 0 THEN 'presencial'  WHEN modalidad = 1 THEN 'virtual' ELSE '' END) AS modalidad FROM carrera WHERE activo = 1";

  const [carreras] = await conexion.query(consulta);

  return carreras;
};




////////////////////////////ELIMINAR CARRERA////////////////////////////
const eliminar = async (idCarrera) => {
  const consulta = 'UPDATE carrera SET activo = 0 WHERE idCarrera = ?';
  await conexion.query(consulta, [idCarrera]);
}



////////////////////////////CREAR CARRERA////////////////////////////
const crear = async (carrera) => {
  const consulta = 'INSERT INTO carrera SET ?';
  const [carreraNueva] = await conexion.query(consulta, carrera);

  return carreraNueva;
}


////////////////////////////ACTUALIZAR CARRERA////////////////////////////
const actualizar = async (idCarrera, nuevosDatos) => {
  const consulta = "UPDATE carrera SET nombre=?,modalidad=? WHERE idCarrera=?";

  const { nombre, modalidad } = nuevosDatos;
  try {
    const [resultado] = await conexion.query(consulta, [nombre, modalidad, idCarrera]);

    return buscarPorID(idCarrera);

  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarPorID,
  buscarCarreras,
  eliminar,
  crear,
  actualizar
}
