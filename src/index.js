const express = require("express");
const nodemailer = require("nodemailer");

//para gestionar cors
const cors = require("cors");

//para loguear las peticiones que recibe el servidor
var morgan = require("morgan");

var fs = require("fs");

var path = require("path");

const handlebars = require("handlebars");

const mysql = require('mysql2');

require('dotenv').config(); //para leer las variables de entorno que están en .env

const passport = require("passport");
require("./config/passport");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Crea un archivo de acceso:
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());

//Para testear la API
app.get('/', (req,res)=>{
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});

//Definición de las rutas del api
//Rutas públicas
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require("./v1/rutas/auth");

//Rutas para Bedel
const v1Estudiante = require('./v1/rutas/estudiante');
const v1Carrera = require('./v1/rutas/carrera');

//Ruta para Decano


//Middleware del api
app.use('/api/v1/publico', v1Publico);
app.use("/api/v1/auth", v1Auth);
app.use('/api/v1/estudiante', v1Estudiante);
app.use('/api/v1/carrera', v1Carrera);

app.listen(process.env.PUERTO, ()=>{
    console.log('API de Bedelía iniciada en el puerto ' + process.env.PUERTO);
})