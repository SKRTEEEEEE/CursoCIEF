const express = require('express');
const app = express();

const port = 4000;

// Cargamos los módulos de ejs
app.set('view engine', 'ejs');
// Vistas(parecido a un componente, son trozos de código qeu podemos reutilizar con diferentes valores?)


app.set("views", __dirname + "/views") //con esta linea le decimos donde estan las views, si no se lo ponemos buscara la carpeta /views, pero si lo tubieramos en otra carpeta no lo encontraria sin esta linea
app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    // res.sendFile('public/index.html', {root: __dirname}, (err)=>console.log(err));
    res.render('index', {titulo: "Desde el Servidor", parrafo: "Esto es un coñazo parecido al php 🙋‍♂️🏴‍☠️", footer: "Estas en index"}); //renderiza la vista index.ejs, render carga los archivos de nuestra vista?
});
app.get("/alumnos", (req, res) => {
    res.render("alumnos", {titulo: "Alumnos", alumnos: ["Pedro", "Juan", "Maria"], footer: "Estas en alumnos"});
})
app.get("/cursos", (req,res)=>{
    res.render("cursos", {titulo: "Cursos", cursos: ["HTML", "CSS", "JavaScript"], footer: "Estas en cursos"});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});