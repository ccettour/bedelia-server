const conexion = require("./conexionBD");


////////////////////////////BUSCAR POR ID////////////////////////////
const buscarPorID = async (idEstudiante) => {
  const consulta =
    "SELECT dni, nombre, apellido, fechaNacimiento,correoElectronico,celular,foto, "  +
    "(CASE " +
    "  WHEN nacionalidad = 0 THEN 'argentino' " +
    "  WHEN nacionalidad = 1 THEN 'uruguayo' " +
    "  WHEN nacionalidad = 2 THEN 'chileno' " +
    "  WHEN nacionalidad = 3 THEN 'paraguayo' " +
    "  WHEN nacionalidad = 4 THEN 'brasilero' " +
    "  WHEN nacionalidad = 5 THEN 'boliviano' " +
    "  ELSE '' " +
    "END) AS nacionalidad " +
    "FROM estudiante " +
    "WHERE activo = 1 AND idEstudiante = ?";

  const [estudiante] = await conexion.query(consulta, idEstudiante);
  console.log(estudiante)
  return estudiante;
};


////////////////////////////BUSCAR TODOS////////////////////////////
const buscarTodos = async ()=>{
    const consulta = "SELECT dni, nombre, apellido, fechaNacimiento,correoElectronico,celular,foto, " +
    "(CASE " +
    "  WHEN nacionalidad = 0 THEN 'argentino' " +
    "  WHEN nacionalidad = 1 THEN 'uruguayo' " +
    "  WHEN nacionalidad = 2 THEN 'chileno' " +
    "  WHEN nacionalidad = 3 THEN 'paraguayo' " +
    "  WHEN nacionalidad = 4 THEN 'brasilero' " +
    "  WHEN nacionalidad = 5 THEN 'boliviano' " +
    "  ELSE '' " +
    "END) AS nacionalidad " +
    "FROM estudiante " +
    "WHERE activo = 1 AND idEstudiante";

    const [estudiantes] = await conexion.query (consulta);

    return estudiantes;
};




////////////////////////////ELIMINAR ESTUDIANTE////////////////////////////
const eliminar = async (idEstudiante)=>{
    const consulta = 'UPDATE estudiante SET activo = 0 WHERE idEstudiante = ?';
    await conexion.query(consulta, [idEstudiante]);
}



////////////////////////////CREAR ESTUDIANTE////////////////////////////
const crear = async (estudiante) =>{
  const consulta = 'INSERT INTO estudiante SET ?';
  const [estudianteNuevo] = await conexion.query(consulta,estudiante);

  return estudianteNuevo;
}


////////////////////////////ACTUALIZAR ESTUDIANTE////////////////////////////
const actualizar = async (idEstudiante, nuevosDatos) =>{
  const consulta = 'UPDATE estudiante SET dni=?,nombre=?,apellido=?,fechaNacimiento=?,nacionalidad=?,correoElectronico=?,celular=?,foto=? WHERE idEstudiante=?';
  
  const {dni,nombre,apellido,fechaNacimiento, nacionalidad,correoElectronico,celular,foto }=nuevosDatos;
  try {
    const [resultado] = await conexion.query(consulta, [dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto, idEstudiante]);

    return buscarPorID(idEstudiante);
  } catch (error) {
    throw error;
  }
};

module.exports = {
    buscarPorID,
    buscarTodos,
    eliminar,
    crear,
    actualizar
}