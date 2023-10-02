const conexion = require("./conexionBD");


const buscarPorID = async (idEstudiante) => {

    const consulta = "SELECT * FROM estudiante WHERE activo=1 AND idEstudiante = ?";

    const [estudiante] = await conexion.query(consulta, idEstudiante);

    return estudiante;
}


/*const crear = async () => {}
const editar = async () => {}
const buscarTodos = async () => {}
const eliminar = async () => {}*/


module.exports = {
    buscarPorID //, crear, editar, buscarTodos, eliminar
}