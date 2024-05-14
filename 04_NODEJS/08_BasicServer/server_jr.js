// const http = require("http");

// const port = process.argv[2] || 3000;

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/html");

//   let response = "";
//   if (req.url === "/") {
//     res.statusCode = 200;
//     response = "<h1>Todo perfecto</h1>";
//     response += `<p>url: http://localhost:${port}${req.url}</p>`;
//   } else {
//     res.statusCode = 404;
//     response = "<h1>Page not found</h1>";
//   }

//   res.write(response);
//   res.end();
// });

// server.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}`);
// });
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
  res.write(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      ${response}
    </body>
  </html>
  `);
  res.end();
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
