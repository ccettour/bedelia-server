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

// Ruta pública para acceder a las fotos
app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});

const {esBedel} = require("./middlewares/esBedel");
const {esDecano} = require("./middlewares/esDecano");

//Definición de las rutas del api
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require("./v1/rutas/auth");

const v1Estudiante = require('./v1/rutas/estudiante');
const v1Carrera = require('./v1/rutas/carrera');
const v1EstudianteCarrera = require('./v1/rutas/estudianteCarrera');
const v1EstudianteMateria = require('./v1/rutas/estudianteMateria');

//const v1Estadistica = require('./v1/rutas/estadistica');


//Middleware del api

//Rutas públicas
app.use('/api/v1/publico', v1Publico);
app.use("/api/v1/auth", v1Auth);

//Rutas para Bedel
app.use('/api/v1/estudiante', [passport.authenticate("jwt", {session: false}), esBedel], v1Estudiante); //Para probar en RESTer, autenticamos, copiamos el token y cuando vamos a consultar en HEADERS ponemos Authorization y el Value es Bearer y el token
app.use('/api/v1/carrera', [passport.authenticate("jwt", {session: false}), esBedel], v1Carrera);
app.use('/api/v1/estudianteCarrera', [passport.authenticate("jwt", {session: false}), esBedel], v1EstudianteCarrera);
app.use('/api/v1/estudianteMateria', [passport.authenticate("jwt", {session: false}), esBedel], v1EstudianteMateria);

//Ruta para Decano
//app.use('/api/v1/estadistica', [passport.authenticate("jwt", {session: false}), esDecano], v1Estadistica); 

app.listen(process.env.PUERTO, ()=>{
    console.log('API de Bedelía iniciada en el puerto ' + process.env.PUERTO);
})