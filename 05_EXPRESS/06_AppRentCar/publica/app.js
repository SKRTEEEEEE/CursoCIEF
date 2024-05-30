// Cargar los módulos
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
//Importar archivos
const rutas = require('./rutas')

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
// app.set("views", __dirname + "/views") 
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
// Middleware para verificar la sesión en cada solicitud
const checkSession = (req, res, next) => {
    res.locals.isAuthenticated = req.session.email ? true : false;
    next();
};

// Aplicar middleware de verificación de sesión a todas las rutas
app.use(checkSession);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(rutas);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

