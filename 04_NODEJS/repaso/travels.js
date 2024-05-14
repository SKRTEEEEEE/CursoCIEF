const { createServer } = require("node:http")
const data = require("./travels.json")
console.log(data);
const puerto = 4000;
let id = "";
let nombre = "";
let desc = "";
let precio = "";
let img ="";




const server = createServer((req, res) => {
    const elemento = data.find(element => "/"+element.id === req.url);

    if (elemento) {
        // Si se encuentra el elemento, asignar sus valores a las variables
        id = elemento.id;
        nombre = elemento.nombre;
        desc = elemento.descripcion;
        precio = elemento.precio;
        img = elemento.img;
    } else {
        // Si no se encuentra el elemento, asignar valores por defecto de "Página no encontrada"
        img = "https://media.istockphoto.com/id/1207750534/es/foto/404-error-internet-page-not-found-mano-con-lupa-concepto-imagen.jpg?s=2048x2048&w=is&k=20&c=gda8OWdYYZgYd2QYQb4Tl1uYRJ8T8GPIgXU8CWk0SfI=";
        nombre = "404";
        desc = "Página no encontrada";
    }

    
   
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${nombre}</title>
        <style>* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        h1 {
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
        }
        h2 {
            margin: 1rem 0;
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
            font-style: italic;
            color: steelblue;
        }
        p {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
        }
        img {
            width: 100%;
        }
        #menu {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            background-color: steelblue;
            height: 4rem;
        }
        a {
            text-decoration: none;
            color: white;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 1rem;
            padding: 0.5rem;
            border: 1px solid white;
            border-radius: 5px;
            transition: 0.3s;
        }
        a:hover {
            background-color: white;
            color: darkblue;
        }</style>
    </head>
    <body>
        <header>
            <h1>Adan's travels</h1>
        </header>
        <main>
            <h2>${nombre}</h2>
            <p>${desc}</p>
            <p>${precio}</p>
            <img src="${img}" alt="Imagen de ${nombre}">
    
        </main>
    </body>
    </html>`)
    res.end()
})


server.listen(puerto, () => {
    console.log(`Server is running on port ${puerto}`);
})
