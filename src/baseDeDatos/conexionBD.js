const mysql = require("mysql2/promise");


// conexión a la base de datos
const conexion = mysql.createPool({
    host: 'localhost',
    user: 'bedelia12',
    database: 'bedelia12',
    password: '2023$prog3'
});

module.exports = conexion;