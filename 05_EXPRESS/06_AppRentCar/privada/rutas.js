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
    const select = "SELECT nombre_modelo, unidades_totales, unidades_alquiladas FROM modelos";
    connMySQL.query(select, (err, result, fields) => {
        if(err) throw err;
        
        // console.log("result: ", result)
        const datosFin = result.map(row => {
            return {
                nombre_modelo: row.nombre_modelo,
                unidades_totales: row.unidades_totales,
                unidades_alquiladas: row.unidades_alquiladas,
                unidades_libres: row.unidades_totales - row.unidades_alquiladas,
                facturacion: 0,
            };
        });
        res.render('index', {title : "Alquila-me el coche", datos: datosFin});
    });
});


rutas.post("/insert", (req,res)=>{
    const {nombre_modelo, unidades_totales, personas, puertas, maletas, tipo, precioDia} = req.body;
    const insert = `INSERT INTO modelos (nombre_modelo, unidades_totales, personas, puertas, maletas, tipo, precioDia) VALUES ('${nombre_modelo}', '${unidades_totales}', '${personas}', '${puertas}', '${maletas}', '${tipo}', '${precioDia}')`;
    connMySQL.query(insert, (err, result, fields) => {
        if(err) throw err;
        // console.log("result: ", result)
        res.redirect('/');
    });
})

rutas.get('/form', (req, res) => {
    // console.log('estoy funcionando');
    res.render('form.ejs', {title : "Mi formulario"});
});

module.exports = rutas;