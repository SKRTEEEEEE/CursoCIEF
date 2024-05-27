// Cargar MySQL
/*
- Tabla en vez de li CHECK
- Botón para ir al formulario
- Puedes ver ruta dinámica según los tipos
*/

const mysql = require("mysql")

//Cargar express
const express = require('express');
const rutas = express.Router();

const configMySQL = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const connMySQL = mysql.createConnection(configMySQL);
//Cargar configurador de rutas
rutas.get('/', (req, res) => {
    // console.log('estoy funcionando');console.log("configMySQL: ", configMySQL)
    const select = "SELECT * FROM agenda";
    connMySQL.query(select, (err, result, fields) => {
        if(err) throw err;
        res.render('index', {title : "Mi Agenda", datos: result});
        console.log("result: ", result)
    });
});

rutas.get("/agenda/:tipo", (req, res)=>{
    
    const {tipo} = req.params;
    const select = `SELECT * FROM agenda WHERE tipo = '${tipo}'`;
    connMySQL.query(select, (err, result, fields) => {
        if(err) throw err;
        res.render('index', {title : "Mi Agenda", datos: result});
        console.log("result: ", result)
    });
})

rutas.post("/insert", (req,res)=>{
    console.log(req.body);
    const {nombre, apellido, numero, tipo} = req.body;
    const insert = `INSERT INTO agenda (nombre, apellido, numero, tipo) VALUES ('${nombre}', '${apellido}', '${numero}', '${tipo}')`;
    connMySQL.query(insert, (err, result, fields) => {
        if(err) throw err;
        res.redirect('/');
    });
})

rutas.get('/form', (req, res) => {
    console.log('estoy funcionando');
    res.render('form.ejs', {title : "Mi formulario"});
});

module.exports = rutas;