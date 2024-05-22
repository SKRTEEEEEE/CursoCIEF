const express = require('express');
const app = express();

const port = 4000;
const datosJSON = require("./data/travels.json")
const lugares = datosJSON.map(travel => ({lugar: travel.lugar, id: travel.id}));

// Cargamos los módulos de ejs
app.set('view engine', 'ejs');
// Vistas(parecido a un componente, son trozos de código qeu podemos reutilizar con diferentes valores?)


app.set("views", __dirname + "/views") //con esta linea le decimos donde estan las views, si no se lo ponemos buscara la carpeta /views, pero si lo tubieramos en otra carpeta no lo encontraria sin esta linea
app.use(express.static(__dirname + "/public"))


app.get('/', (req, res) => {
    const mainPlace = datosJSON.find(travel => travel.id === "");
    if (mainPlace) {
        res.render("index", {
            lugares,
            nombre: mainPlace.nombre,
            descripcion: mainPlace.descripcion,
            precio: mainPlace.precio,
            img: mainPlace.img,
            lugar: mainPlace.lugar,
            id: mainPlace.id
        });
    } else {
        res.status(404).send('Lugar principal no encontrado');
    }
});

app.get('/:lugar', (req, res) => {
    const datosRuta = datosJSON.filter(travel => travel.id == req.params.lugar.toLowerCase())
    if (datosRuta.length > 0) {
        res.render("index", {
            lugares,
            nombre: datosRuta[0].nombre,
            descripcion: datosRuta[0].descripcion,
            precio: datosRuta[0].precio,
            img: datosRuta[0].img,
            lugar: datosRuta[0].lugar,
            id: datosRuta[0].id
        });
    } else {
        res.status(404).send('Lugar no encontrado');
    }
    // res.render('index', {
    //     id: "",
    //     lugar : "Main",
    //     nombre: "¡Viaja por todo el mundo!",
    //     descripcion: "La mejor agencia de viajes de Internet",
    //     precio: "Los mejores precios que puedas encontrar",
    //     img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // }); 
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});