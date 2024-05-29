const mysql = require("mysql")
const express = require('express');
const rutas = express.Router();

const configMySQL = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const connection = mysql.createConnection(configMySQL);

rutas.get("/", (req, res) => {
    res.render('index', {title : "Alquila-me el coche"}); 
    // res.send("Hola mundo"); 
})

rutas.get("/:tipo", (req,res)=>{
    const tipo = req.params.tipo;
    console.log("tipo: ", tipo)
    const select = `SELECT * FROM modelos WHERE tipo ="${tipo}"`
    connection.query(select, (err, result)=>{
        if(err) throw err;
        res.render('index', {title : "Alquila-me el coche", data : result})
        console.log(result)
    })
})

module.exports = rutas;