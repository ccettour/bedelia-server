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

//Definiciçon de las rutas del api
const v1Publico = require('./v1/rutas/publico');
const v1Estudiante = require('./v1/rutas/estudiante');

//Middleware del api
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/estudiante', v1Estudiante);

/*app.post("/contacto",(req,res)=>{
     const {nombre,email,mensaje} = req.body;

    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '/handlebars/plantilla.hbs'), 'utf8');
    
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    // Datos de la plantilla
    const datos = {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    };
  
    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);

    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.PASS
        }
    })

    const opciones = {
        from:'api prog3',
        to:'chriscettour@gmail.com',
        subject:'TP prog3',
        html:correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    }) 
});*/

// conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'bedelia12',
    database: 'bedelia12',
    password: '2023$prog3'
});

app.get('/estudiantes', (req, res)=>{
    const consulta = 'SELECT * FROM estudiante where activo = 1';
    conexion.execute(consulta, (error, resultado, campos) =>{
        if(error){
            console.log(error);
        }else{
            console.log(campos);
            res.status(200).json(resultado);
        }
    })
});

app.listen(process.env.PUERTO, ()=>{
    console.log('API de Bedelía iniciada en el puerto ' + process.env.PUERTO);
})