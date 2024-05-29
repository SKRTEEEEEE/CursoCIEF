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
    // res.render('index', {title : "Alquila-me el coche"}); 
    res.send("Hola mundo"); 
})

module.exports = rutas;