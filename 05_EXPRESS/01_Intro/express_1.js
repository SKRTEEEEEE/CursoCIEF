//Importar los modulos de express

const express = require("express")

const app = express();

const port = 4000;

const jsonPack = require("./static/json/employees.json")

app.get("/", (req, res) => {
    // res.send("<h1>Home</h1>")
    res.sendFile("./static/index.html",{root: __dirname})

})
app.get("/alumnos", (req, res) => {
    res.json(jsonPack)
    // res.send(JSON.stringify(jsonPack))
})
app.use(express.static("static"))
app.use((req, res) => {
    res.status(404).sendFile("./static/404.html",{root: __dirname})
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})