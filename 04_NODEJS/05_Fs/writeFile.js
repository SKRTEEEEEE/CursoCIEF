const fs = require("node:fs");

//Sobre escribe el documento

fs.writeFile("text2.txt", "Hello World!", (err) => {
    if (err) throw err;
    console.log("File saved!");
})
