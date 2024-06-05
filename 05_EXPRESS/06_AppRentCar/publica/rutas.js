const mysql = require("mysql")
const express = require('express');
const rutas = express.Router();

const configMySQL = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
const isAuthenticated = (req, res, next) => {
    if (req.session.email) {
        return next();
    } else {
        res.redirect(`/login?redirect=${req.originalUrl}`);
    }
};

const connection = mysql.createConnection(configMySQL);
const fetchTipos = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT tipo FROM modelos GROUP BY tipo;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
const getAlquileresPorModelo = (idModelo) => {
    const query = `SELECT * FROM alquileres WHERE id_modelo = ${idModelo}`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                // Ajustar la fecha a la zona horaria correcta
                const formattedResults = results.map(row => {
                    const fechaRecogida = new Date(row.fecha_recogida);
                    const fechaEntrega = new Date(row.fecha_entrega);

                    // Convertir a la misma zona horaria
                    const adjustedFechaRecogida = new Date(fechaRecogida.getTime() - fechaRecogida.getTimezoneOffset() * 60000).toISOString().split('T')[0];
                    const adjustedFechaEntrega = new Date(fechaEntrega.getTime() - fechaEntrega.getTimezoneOffset() * 60000).toISOString().split('T')[0];

                    return {
                        ...row,
                        fecha_recogida: adjustedFechaRecogida,
                        fecha_entrega: adjustedFechaEntrega
                    };
                });

                console.log("result getAlquileres: ", formattedResults);
                resolve(formattedResults);
            }
        });
    });
};
const fetchUnidadesAlquiladas = (id) => {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
    console.log("today: ", today)
    const fetch = `
        SELECT 
            COUNT(*) AS unidades_alquiladas 
        FROM 
            alquileres 
        WHERE 
            id_modelo = ? AND fecha_recogida <= ? AND fecha_entrega >= ?
    `;

    return new Promise((resolve, reject) => {
        connection.query(fetch, [id, today, today], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].unidades_alquiladas || 0);
            }
        });
    });
};


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const determinarDisponibilidad = (unidadesLibres) => {
    if (unidadesLibres === 0) {
        return "🔴 No disponible";
    } else if (unidadesLibres === 1) {
        return "🟡 Ultima unidad";
    } else if (unidadesLibres === 2 || unidadesLibres === 3) {
        return "🟠 Pocas unidades";
    } else {
        return "🟢 Disponible";
    }
};
const generarIntervalosDisponibilidad = (alquileres, unidadesTotales) => {
    const intervalos = [];
    let fechaActual = new Date();
    fechaActual.setUTCHours(0, 0, 0, 0);

    // Ordenar los alquileres por fecha de recogida
    alquileres.sort((a, b) => new Date(a.fecha_recogida) - new Date(b.fecha_recogida));

    alquileres.forEach(alquiler => {
        const fechaRecogida = new Date(alquiler.fecha_recogida);
        const fechaEntrega = new Date(alquiler.fecha_entrega);

        // Si la fecha de recogida es posterior a la fecha actual y hay un intervalo entre la última entrega y la recogida
        if (fechaRecogida > fechaActual) {
            intervalos.push({
                inicio: fechaActual,
                fin: fechaRecogida,
                disponibles: unidadesTotales - 1
            });
        }

        // Actualizar la fecha actual a la fecha de entrega si es posterior a la fecha actual
        if (fechaEntrega > fechaActual) {
            fechaActual = fechaEntrega;
        }
    });

    // Agregar un intervalo final
    intervalos.push({
        inicio: fechaActual,
        fin: null,
        disponibles: unidadesTotales - 1
    });

    return intervalos;
};




rutas.get("/", async (req, res) => {
    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        res.render('index', { title: "Alquila-me el bugga", tipos });
    } catch (err) {
        console.error("Error fetching tipos:", err);
        res.status(500).send("Error fetching data");
    }
});
rutas.get("/logout", (req, res) => {
    // Destruir la sesión (eliminar todas las variables de sesión)
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            res.status(500).send("Error al cerrar sesión");
        } else {
            // Redirigir al usuario a la página de inicio u otra página
            res.redirect('/');
        }
    });
});
rutas.get("/login", (req, res)=>{
    const redirectUrl = req.query.redirect || '/';
    try {
        res.render('login', { title: "Login page", redirectUrl });
    } catch (err) {
        console.error("Error fetching tipos:", err);
        res.status(500).send("Error fetching data");
    }
})

rutas.post("/login", (req, res) => {
    const { email, password, redirectUrl } = req.body;
    try {
        connection.query("SELECT id_cliente, email, password FROM clientes",(err, result)=>{
            if(err) throw err;
            // console.log("resultado select login: ", result)
            const user = result.find(user=>user.email === email)
            if(user.password === password){
                req.session.email = email; // Almacenar el email en la sesión
                req.session.userId = user.id_cliente // Almacenar el id en la sesión
                // console.log("Session:", req.session);
                return res.redirect(redirectUrl || '/');
            } else {
                return res.redirect('/login');
            }
        })
    } catch (error) {
        console.error("Error al iniciar session el usuario: ", error)
    }
});

rutas.get("/signin", async(req, res)=>{
    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        res.render('signin', { title: "Pagina de registro", tipos });
    } catch (err) {
        console.error("Error fetching tipos:", err);
        res.status(500).send("Error fetching data");
    }
})

rutas.post("/signin", (req, res)=>{
    console.log("signin req.body: ", req.body)
    const {nombre, apellido, dni, tel, email, poblacio, password} = req.body
    try {
        connection.query(`INSERT INTO clientes (nombre, apellido, dni, tel, email, poblacio, password) VALUES ('${nombre}', '${apellido}', '${dni}', '${tel}', '${email}', '${poblacio}', '${password}');`,(err, res)=>{
            if(err)throw err;
            console.log("usuario subido a la bdd, ahora debería hacer el login auto");
            
        })
        return res.redirect("/login")
    } catch (error) {
        console.error("Error al subir un nuevo usuario a la bdd :", error)
    }
})


rutas.get("/:tipo", async (req, res) => {
    const tipo = req.params.tipo;
    // console.log("tipo: ", tipo)
    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo =>  ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        const select = `SELECT * FROM modelos WHERE tipo = ?;`
        connection.query(select, [tipo], (err, result) => {
            if (err) throw err;
            
            res.render('tipo', { title: "Alquila-me lo", data: result, tipos, tipo })
            console.log(result)
        })
    } catch (error) {
        console.error(`Error fetching data from ${tipo}: `,error)
        res.status(500).send("Error fetching data");
    }
})


//Falta hacer el collapse, de las uds disponibles, a partir de aquí !!
//Como extra: Mirar si funciona el componente card /->(isReserva)

rutas.get("/:tipo/:id", async (req, res) => {
    const id = req.params.id;
    const isReserva = false;
    try {
        let tipos = await fetchTipos();
        const unidadesAlquiladasHoy = await fetchUnidadesAlquiladas(id)
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));

        const selectModelo = `SELECT * FROM modelos WHERE id_modelo = ?;`;

        connection.query(selectModelo, [id], async (err, resultModelo) => {
            if (err) throw err;

            // const alquileres = await getAlquileresPorModelo(id);
            const unidadesTotales = resultModelo[0].unidades_totales;
            // const unidadesAlquiladasHoy = alquileres.filter(alquiler => new Date(alquiler.fecha_recogida) <= new Date() && new Date(alquiler.fecha_entrega) >= new Date()).length;
            const unidadesLibres = unidadesTotales - unidadesAlquiladasHoy;
            const disponibilidad = determinarDisponibilidad(unidadesLibres);

            res.render('modelo', {
                title: "Alquila-me el bugga",
                data: resultModelo,
                tipos,
                isReserva,
                unidades_libres: unidadesLibres,
                disponibilidad: disponibilidad
            });
            console.log("ResultModelo: ", resultModelo);
            console.log("udsLibre: ", unidadesLibres);
            console.log("dispo :", disponibilidad);
        });
    } catch (error) {
        console.error(`Error fetching data from vehicle with id ${id}: `, error);
        res.status(500).send("Error fetching data");
    }
});

rutas.get("/:tipo/:id/reserva", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const isReserva = true;

    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));

        const unidadesAlquiladasHoy = fetchUnidadesAlquiladas(id)

        const selectModelo = `SELECT * FROM modelos WHERE id_modelo = ?;`;
        const alquileres = await getAlquileresPorModelo(id);
        // console.log("alquileres: ",alquileres)

        connection.query(selectModelo, [id], (err, resultModelo) => {
            if (err) throw err;
            // console.log("result modelo: ",resultModelo)

            const unidadesTotales = resultModelo[0].unidades_totales;
            
            // const unidadesDisponibles = unidadesTotales - unidadesAlquiladasHoy;
            // console.log("uds disponibles: ", unidadesDisponibles)

            let intervalos = [];
            if (unidadesAlquiladasHoy <= 1) {
                intervalos = generarIntervalosDisponibilidad(alquileres, unidadesTotales);
            }

            res.render('reserva', {
                title: "Alquila-me el bugga",
                data: resultModelo,
                tipos,
                id_modelo: id,
                isReserva,
                id_cliente: req.session.userId,
                intervalos
            });
            console.log("intervalos: ", intervalos);
            // console.log("uds disponible: ", unidadesDisponibles)
        });
    } catch (error) {
        console.error(`Error reserva from vehicle with id ${id}: `, error);
        res.status(500).send("Error fetching data");
    }
});




rutas.post("/reserva",(req, res)=>{
    console.log("reserva: ", req.body)
    const {id_cliente, facturacion, id_modelo, fecha_recogida, fecha_entrega} = req.body;
  // Parsear las fechas al formato YYYYMMDD
  const fechaRecogida = fecha_recogida.split("/").reverse().join("");
  const fechaEntrega = fecha_entrega.split("/").reverse().join("");
    try {
        connection.query(
            `INSERT INTO alquileres (id_cliente, facturacion, id_modelo, fecha_recogida, fecha_entrega) 
             VALUES (?, ?, ?, DATE_FORMAT(?, '%Y-%m-%d'), DATE_FORMAT(?, '%Y-%m-%d'))`,
            [id_cliente, facturacion, id_modelo, fechaRecogida, fechaEntrega],
            (err) => {
              if (err) throw err;
            }
          );
        res.redirect("/")
    } catch (error) {
        console.error(`Error al crear una nueva reserva: `, error)
        res.status(500).send("Error updating a new rent")
    }
})




module.exports = rutas;