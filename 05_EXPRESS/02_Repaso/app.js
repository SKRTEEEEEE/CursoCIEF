//El orden de las acciones es de arriba a abajo

// Importación de los módulos
const express = require('express');
const app = express();

//   `node --env-file .env app.js`
const port = process.env.PORT || 4000;
// const port = process.argv[2] || 4000;


//Hay que decirle a node donde están nuestros archivos estáticos que va a buscar
const recursosEstaticos = "public";
app.use(express.static(recursosEstaticos))


//Importar archivos estáticos
const datosJSON = require("./data/employees.json")

app.get("/", (req,res)=>{
    // res.send("<h1>Hola mundo</h1>")
    //__dirname es una variable que nos da la ruta del directorio actual, osea hasta llegar a app.js
    res.sendFile("./public/index.html",{root:__dirname}, (err)=>console.log(err))
})

app.get("/alumnos", (req, res) =>{
    res.json([{
        "nombre": "Adan",
        "apellido": "Reh",
        "edad": 18
    },{
        "nombre": "Pepe",
        "apellido": "Reh",
        "edad": 22
    }
])
})
app.get("/customers",(req,res)=>{
    res.json(datosJSON);
})
app.get("/customers/:nombre", (req, res) =>{
    console.log(req.params.nombre)
    const nombre = req.params.nombre;
    // const customer = datosJSON.find(customer => customer.nombre === nombre);
    const customer = datosJSON.filter(customers => customers.name === nombre);
    if(customer.length === 0){
        res.status(404).send(`<h1>Pagina no encontrada</h1>`)
        return
    }
    res.json(customer);
})
app.get("/customers/:nombre/:apellido", (req, res) =>{
    console.log(req.params.nombre)
    const nombre = req.params.nombre;
    const apellido = req.params.apellido;
    // const customer = datosJSON.find(customer => customer.nombre === nombre);
    const customer = datosJSON.filter(customer => customer.name === nombre && customer.surname === apellido);
    if(customer.length === 0){
        res.status(404).send(`<h1>Pagina no encontrada</h1>`)
        return
    }
    res.json(customer);
})

// Aquí, estamos usando el .use() para ejecutarse cuando no encuentre una ruta superior
app.use((req, res)=>{
    res.status(404).send(`<h1>Pagina no encontrada</h1>`)
})

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
})