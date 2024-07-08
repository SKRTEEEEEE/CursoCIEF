// Cargar los módulos
const express = require('express')
const mysql = require('mysql')
const path = require('path')

// Iniciar las rutas
const router = express.Router()

// Variables Conexión a la base de datos
const configMySQL = {
    host: "localhost",
    user: "cief",
    password: "Cief+2024",
    database: "uf1846exam"
}

// Conexión a la base de datos
const connection = mysql.createConnection(configMySQL);
// Instanciar tipos y cargarlos a traves de una query
let tipos = [];
connection.query("SELECT DISTINCT(departamento) FROM team GROUP BY departamento", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        tipos = result;
        // console.log("result: ", result)
    }
});

// Ruta raíz
router.get('/', (req, res) => {
    //Select info para ruta raíz
    const selectAll = "SELECT * FROM team"
    connection.query(selectAll, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("result: ",result);
            console.log("tipos: ", tipos);
            //Envio ruta raíz
            res.render("index", { result, tipos})
        }
    })
})
//Ruta dinamica tipo de departamento (igual que la anterior)
router.get("/departamento/:tipo",async(req,res)=>{
    const tipo = req.params.tipo
    const selectAll = "SELECT * FROM team WHERE departamento = ?"//El interrogante es para pasar la informacion
    //Se la pasaremos aqui
    connection.query(selectAll,[tipo], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0){
                res.render("error", {tipos})
            }else {res.render("index", { result, tipos})}
            
        }
    })
})
//Ruta dinamica para mostrar la card de cada usuario según apellido
router.get("/team/:apellido",async(req,res)=>{
    const apellido = req.params.apellido
    const selectAll = "SELECT * FROM team WHERE apellido = ?"
    
    connection.query(selectAll,[apellido], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0){
                res.render("error", { tipos})
            }else {res.render("index", { result, tipos})}
            
        }
    })
})



module.exports = {router, tipos}