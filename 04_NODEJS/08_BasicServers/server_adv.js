//Vamos a hacer que cuando vayas a la ruta /node te diga que estas en node y haya un enlaçe, y en / lo mismo 

const http = require("http");

const port = process.argv[2] || 0;

const server = http.createServer((req, res) => {
  let title = "";
  let response = "";
  if (res.statusCode === 200) {
    title = "Backend en Cief";
    response = `<p>url: http://localhost:${port}${req.url}</p>`;
  } else if (res.statusCode === 404) {
    title = "Página no encontrada";
  }
  res.writeHead(res.statusCode, { "Content-Type": "text/html; charset=utf-8" });
  if(req.url === "/"){
  res.write(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      ${response}
      <a href="/node">Ir a node</a>
    </body>
  </html>
  `);} else if (req.url === "/node") {
    res.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <h1>Node</h1>
        <p>${response}</p>
        <a href="/">Ir a main</a>
      </body>
    </html>
    `);
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
