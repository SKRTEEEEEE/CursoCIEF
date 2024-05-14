const http = require('http');

// console.log(http.STATUS_CODE);
// let numPeticiones = 1;
const PORT = 4000;
const server = http.createServer((req, res)=>{
    /* console.log(`Peticion num: ${numPeticiones}`);
    console.log("url: ",req.url)
    console.log(req.method)
    console.log(req.headers)
    
    */
   console.log(res.statusCode);
   res.setHeader("Content-Type", "application/json")
   res.end(JSON.stringify("Hola Mundo!"))
})

server.listen(PORT, () => {
    console.log(`Server in port: ${PORT}`)
})

