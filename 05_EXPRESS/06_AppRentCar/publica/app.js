// Cargar los módulos
const express = require('express');
const app = express();
// Imporatado las rutas
const rutas = require('./rutas')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(rutas);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

