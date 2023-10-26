const conexion = require("./conexionBD");

 
////////////////////////////BUSCAR////////////////////////////
const buscar = async (correo, clave) => {
  const consulta =
    "SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico "  +
    "FROM usuario " +
    "WHERE correoElectronico=? AND clave=SHA2(?,256) AND activo=1";

  const [usuario] = await conexion.query(consulta, [correo,clave]);

  return usuario[0];
};


////////////////////////////BUSCAR POR ID////////////////////////////
const buscarPorID = async (idUsuario) => {
    const consulta =
      "SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico "  +
      "FROM usuario " +
      "WHERE usuario.idUsuario=? AND activo=1";
  
    const [usuario] = await conexion.query(consulta, [idUsuario]);
  
    return usuario[0];
  };


module.exports = {
    buscar,
    buscarPorID
}