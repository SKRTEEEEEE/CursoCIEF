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
    const select = "SELECT id_modelo, nombre_modelo, unidades_totales FROM modelos";
    connMySQL.query(select, (err, result) => {
        if(err) throw err;
        
        console.log("result: ", result)
        const datosFin = result.map(row => {
            return {
                id_modelo: row.id_modelo,
                nombre_modelo: row.nombre_modelo,
                unidades_totales: row.unidades_totales,
                unidades_alquiladas: 0,
                unidades_libres: 0,
                facturacion: 0,
            };
        });
        res.render('index', {title : "Alquila-me el coche", datos: datosFin});
    });
});

rutas.get('/form', (req, res) => {
    // console.log('estoy funcionando');
    res.render('form.ejs', {title : "Mi formulario"});
});
rutas.post("/insert", (req,res)=>{
    const {nombre_modelo, unidades_totales, personas, puertas, maletas, tipo, precioDia, cambio} = req.body;
    const insert = `INSERT INTO modelos (nombre_modelo, unidades_totales, personas, puertas, maletas, tipo, precioDia, cambio) VALUES ('${nombre_modelo}', '${unidades_totales}', '${personas}', '${puertas}', '${maletas}', '${tipo}', '${precioDia}', '${cambio}')`;
    connMySQL.query(insert, (err) => {
        if(err) throw err;
        // console.log("result: ", result)
        res.redirect('/');
    });
})
rutas.get("/update/:modelo/:id",(req, res)=>{
    const id = req.params.id;
    const modelo = req.params.modelo;
    console.log("id: ", id)
    try {
        connMySQL.query(`SELECT unidades_totales, precioDia FROM modelos WHERE id_modelo = ${id}`,(err,result)=>{
            if(err)throw err;
            console.log("resultado del select update: ",result)
            res.render("update.ejs", {title: "Update a car",modelo, id, result})
        }) 
    } catch (error) {console.error(`Error al buscar el modelo: ${modelo} con id: ${id}`)}
    
})
rutas.post("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {unidades_totales, precioDia} = req.body;
    console.log("params: ", unidades_totales, precioDia, id);
    // console.log("req.body: ", req.body)
    try {
        connMySQL.query(`UPDATE modelos SET unidades_totales = ${unidades_totales}, precioDia = ${precioDia} WHERE id_modelo = ${id}`,(err)=>{if(err)throw err})
        res.redirect("/")
    } catch (error) {
        console.error(`Error al intentar hacer el update del modelo con el id ${id}: `, error)
    }
})



module.exports = rutas;