const http = require("node:http")

// const port = process.argv[2] || 0
let port = 0
if (process.argv[2] === undefined) {
    console.log("You should write a port next time");
} else {
    port = process.argv[2]
}
const server = http.createServer((req, res)=>{
//  res.statusCode = 404;
    if(res.statusCode === 200){
       
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.end("Todo OK\n")
    } else if (res.statusCode === 404) {
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.end("Pagina no encontrada\n")
    }
})

server.listen(port, () =>{
    console.log(`Server listening on http://localhost:${server.address().port}`);
})