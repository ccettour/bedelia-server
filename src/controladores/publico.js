const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req,res) => {
    const {nombre,email,mensaje} = req.body;

    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    
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
}