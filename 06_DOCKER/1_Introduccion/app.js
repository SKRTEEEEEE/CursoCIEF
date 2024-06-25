const express = require('express');
const path = require('path');
const morgan = require("morgan");

const app = express();
const port = 2500;

//Cargar la configuración de uso de morgan, según la cantidad de info que quieras que devuelva
app.use(morgan('dev'));

// Configura la carpeta /public como carpeta estática
app.use(express.static(path.join(__dirname, 'public')));

// Configura la ruta principal para cargar el index.html
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Levanta el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
