const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el envío del formulario
app.post('/procesarformulario', (req, res) => {
    const { email } = req.body;

    // Configurar el transportador de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_correo@gmail.com',
            pass: 'tu_contraseña'
        }
    });

    // Configurar el correo electrónico
    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: 'vertexvinyls@gmail.com', // Cambia esto por tu dirección de correo electrónico
        subject: 'Nuevo correo electrónico ingresado',
        text: `Se ha ingresado un nuevo correo electrónico: ${email}`
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
            res.status(500).send('Error al procesar la solicitud');
        } else {
            console.log('Correo electrónico enviado:', info.response);
            res.status(200).send('Correo electrónico enviado correctamente');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
