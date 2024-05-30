// Cargar los módulos
const express = require('express');
const app = express();
// Imporatado las rutas
const rutas = require('./rutas')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const session = require('express-session');


app.set('view engine', 'ejs');
// app.set("views", __dirname + "/views") 
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(rutas);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

