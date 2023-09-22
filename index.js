const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require('dotenv').config(); //para leer las variables de entorno que están en .env

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.get('/', (req,res)=>{

    const saludo="Bienvenido a prog3!";
    res.status(200).json({saludo});
});

app.post("/contacto",(req,res)=>{
    const {nombre,email,mensaje} = req.body;

    // console.log(req.body);
    // console.log(nombre);
    // console.log(email);
    // console.log(mensaje);

    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.PASS
        }
    })

    const cuerpo = '<h1>Hola. Llegó un correo de ' +nombre+ ' con el siguiente mensaje: </br>'+mensaje+'</h1>'; //acá va HTML y CSS. Completamos con lo que queremos

    const opciones = {
        from:'api prog3',
        to:'chriscettour@gmail.com',
        subject:'TP prog3',
        html:cuerpo
    }

    transporter.sendMail(opciones, (error,info)=>{
        if(error){
            console.log('error -> ',error);
            const respuesta='correo no enviado';
            res.json({respuesta});
        } else {
            //console.log(info);
            const respuesta='correo enviado';
            res.json({respuesta});
        }
    })

    
})


app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciado "+process.env.PUERTO);
})