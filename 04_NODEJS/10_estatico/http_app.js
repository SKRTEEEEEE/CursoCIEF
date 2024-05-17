// Importar los módulos necesarios en el proyecto
// const http = require('http');
const { createServer } = require("node:http");
const { createReadStream } = require("node:fs");
const path = require("node:path");


// Concretar el puerto del servidor
const PORT = 3000;

// Tipos de Content-Type
const HTML_CONTENT_TYPE = "text/html; charset=utf-8";
const CSS_CONTENT_TYPE = "text/css";
const JS_CONTENT_TYPE = "application/javascript";
const PNG_CONTENT_TYPE = "image/png";

// Indicar la ruta de los ficheros estáticos
const STATIC_DIR = "static";
const STATIC_FILES_PATH = path.join(__dirname, STATIC_DIR);

// Crear el servidor
const server = createServer((req, res) => {
  // Obtener la url del recurso solicitado
  const { url } = req;
  let contadorVisitas = 1;
  let stream;
  let statusCode = 200;
  let contentType = HTML_CONTENT_TYPE;

  if (url === "/") {
    // Leer el contenido del fichero html
    stream = createReadStream(`${STATIC_FILES_PATH}/index.html`);
  } else if (url.match(".css$")) {
    contentType = CSS_CONTENT_TYPE;
    // Leer el contenido del fichero css
    stream = createReadStream(`${STATIC_FILES_PATH}/style.css`);
  } else if (url.match(".js$")) {
    contentType = JS_CONTENT_TYPE;
    // Leer el contenido del fichero js
    stream = createReadStream(`${STATIC_FILES_PATH}/app.js`);
  } else if (url.match(".png$")) {
    contentType = PNG_CONTENT_TYPE;
    // console.log("url solicitada", url);
    stream = createReadStream(`${STATIC_FILES_PATH}/${url}`)

  } else {
    statusCode = 404;
  }

  // Aplicamos el Content-Type adecuado a cada peticion
  res.writeHead(200, { "Content-Type": contentType });

  if (stream) {
    stream.pipe(res); // si tenemos un stream lo enviará como respuesta
  } else {
    res.statusCode = statusCode;
    return res.end("No he encontrado el recurso");
  }
});

// Poner el servidor en escucha
server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
