// Cargar los módulos
const express = require('express')
const mysql = require('mysql')
const path = require('path')

// Iniciar las rutas
const router = express.Router()

// Conexión a la base de datos
const configMySQL = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const connection = mysql.createConnection(configMySQL);
// const tiposBuscados = () => {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT DISTINCT(tipo) FROM modelos GROUP BY tipo", (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }
let tipos = [];
connection.query("SELECT DISTINCT(tipo) FROM modelos GROUP BY tipo", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        tipos = result;
    }
});

// Ruta raíz
router.get('/', (req, res) => {
    const selectAll = "SELECT * FROM modelos"
    connection.query(selectAll, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(result);
            res.render("index", {h2 : "Our wonderful cars", result, tipos})
        }
    })
})

router.get("/type/:tipo",async(req,res)=>{
    const tipo = req.params.tipo
    const selectAll = "SELECT * FROM modelos WHERE tipo = ?"
    
    connection.query(selectAll,[tipo], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0){
                res.render("error", {h2 : "No se han encontrado modelos", tipos})
            }else {res.render("index", {h2 : "Our wonderful cars", result, tipos})}
            
        }
    })
})



module.exports = {router, tipos}