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
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
rutas.get("/login",async (req, res)=>{
    const redirectUrl = req.query.redirect || '/';
    console.log("redirectUrl: ", redirectUrl)
    console.log("email session antes del login: ", req.session.email)
    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        res.render('login', { title: "Login page", tipos, redirectUrl });
    } catch (err) {
        console.error("Error fetching tipos:", err);
        res.status(500).send("Error fetching data");
    }
})
//Falta verificar en BDD
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

rutas.get("/:tipo", async (req, res) => {
    const tipo = req.params.tipo;
    // console.log("tipo: ", tipo)
    try {
        let tipos = await fetchTipos();
        //Pasar a ES7
        tipos = tipos.map(tipo => {
            return { tipo: capitalizeFirstLetter(tipo.tipo) };
        });
        const select = `SELECT * FROM modelos WHERE tipo ="${tipo}";`
        connection.query(select, (err, result) => {
            if (err) throw err;
            
            res.render('tipo', { title: "Alquila-me lo", data: result, tipos, tipo })
            console.log(result)
        })
    } catch (error) {
        console.error(`Error fetching data from ${tipo}: `,error)
        res.status(500).send("Error fetching data");
    }
})

rutas.get("/:tipo/:id", async (req, res) => {
    const id = req.params.id;
    const isReserva = false;
    try {
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        const select = `SELECT * FROM modelos WHERE id_modelo = ${id};`
        connection.query(select, (err, result) => {
            if (err) throw err;
            res.render('modelo', { title: "Alquila-me el bugga", data: result, tipos , isReserva})
            console.log(result)
        })
    } catch (error) {
        console.error(`Error fetching data from vehicle with id ${id}: `, error)
        res.status(500).send("Error fetching data");
    }
})

rutas.get("/:tipo/:id/reserva", isAuthenticated, async (req, res) => {
    const id = req.params.id;    
    const isReserva = true;
    try {
        
        let tipos = await fetchTipos();
        tipos = tipos.map(tipo => ({ tipo: capitalizeFirstLetter(tipo.tipo) }));
        // res.render('reserva', { title: "Alquila-me el bugga", tipos, id })
        const select = `SELECT * FROM modelos WHERE id_modelo = ${id};`
        connection.query(select, (err, result) => {
            if (err) throw err;

            res.render('reserva', { title: "Alquila-me el bugga", data: result, tipos, id_modelo: id, isReserva, id_cliente: req.session.userId })
            // console.log(result)
        })
    } catch (error) {
        console.error(`Error reserva from vehicle with id ${id}: `, error)
        res.status(500).send("Error fetching data");
    }
})

rutas.post("/reserva",(req, res)=>{
    console.log("reserva: ", req.body)
})




module.exports = rutas;