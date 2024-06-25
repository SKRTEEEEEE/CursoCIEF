// Cargar los módulos
const express = require('express')
// const bodyParser = require('body-parser')
const router = require('./router.js')

// Crear la aplicación
const app = express()

// Definir el puerto de conexión
const port = process.env.PORT || 2500

// Definir el motor de plantillas
app.set('view engine', 'ejs')

// Configurar body-parser
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Definir la carpeta de los ficheros estáticos
app.use(express.static('public'))

// Utilizar las rutas del fichero router.js
app.use(router)







// Poner el servidor en escucha
app.listen(port, () => console.log(`Servidor funcionando en http://localhost:${port}`))
