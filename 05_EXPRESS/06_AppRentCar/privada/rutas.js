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
// const fetchFacturacionModelo = (id) => {
//     const fetch = `
//         SELECT 
//             al.fecha_recogida, 
//             al.fecha_entrega, 
//             al.facturacion, 
//             mo.nombre_modelo, 
//             mo.precioDia, 
//             mo.unidades_totales 
//         FROM 
//             modelos mo 
//         INNER JOIN 
//             alquileres al 
//         ON 
//             al.id_modelo = mo.id_modelo 
//         WHERE 
//             mo.id_modelo = ?
//     `;

//     return new Promise((resolve, reject) => {
//         connMySQL.query(fetch, [id], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };
const fetchFacturacionModelo = (id) => {
    const fetch = `
        SELECT 
            SUM(facturacion) AS facturacion 
        FROM 
            alquileres 
        WHERE 
            id_modelo = ?
    `;

    return new Promise((resolve, reject) => {
        connMySQL.query(fetch, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].facturacion || 0);
            }
        });
    });
};
const fetchUnidadesAlquiladas = (id) => {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
    const fetch = `
        SELECT 
            COUNT(*) AS unidades_alquiladas 
        FROM 
            alquileres 
        WHERE 
            id_modelo = ? AND fecha_entrega >= ?
    `;

    return new Promise((resolve, reject) => {
        connMySQL.query(fetch, [id, today], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].unidades_alquiladas || 0);
            }
        });
    });
};
//Cargar configurador de rutas
rutas.get('/', async (req, res) => {
    const select = "SELECT id_modelo, nombre_modelo, unidades_totales FROM modelos";
    try {
        connMySQL.query(select, async (err, result) => {
            if (err) throw err;

            console.log("result: ", result);

            const datosFinPromises = result.map(async row => {
                const facturacion = await fetchFacturacionModelo(row.id_modelo);
                const unidadesAlquiladas = await fetchUnidadesAlquiladas(row.id_modelo);
                const unidadesLibres = row.unidades_totales - unidadesAlquiladas;

                return {
                    id_modelo: row.id_modelo,
                    nombre_modelo: row.nombre_modelo,
                    unidades_totales: row.unidades_totales,
                    unidades_alquiladas: unidadesAlquiladas,
                    unidades_libres: unidadesLibres,
                    facturacion: facturacion,
                };
            });

            const datosFin = await Promise.all(datosFinPromises);
            console.log("datosFin: ", datosFin);
            res.render('index', { title: "Alquila-me el coche", datos: datosFin });
        });
    } catch (error) {
        console.error("Error al cargar los datos de los modelos: ", error);
        res.status(500).send("Error al cargar los datos de los modelos");
    }
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