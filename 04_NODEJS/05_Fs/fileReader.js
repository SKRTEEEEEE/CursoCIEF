//FS = File System
const fs = require('fs');
console.log("linea 5");
fs.readFile("./text1.md", "utf-8", (err, data) => {
    err ? console.log(err) : console.log(data);
        
})
console.log("linea 8");

/*
const fs = require('fs');

console.log("linea 5");
const texto = fs.readFile("./text1.md", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        return data;
    }
})
console.log(texto);
console.log("linea 8");
*/
