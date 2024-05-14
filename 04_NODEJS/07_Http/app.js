const http = require("node:http");

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end("Hello World!!")
})

server.listen(0, ()=>console.log(`Servidor corriendo en http://localhost:${server.address().port}`))