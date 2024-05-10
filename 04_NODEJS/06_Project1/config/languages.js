const fs = require("node:fs")


const languages = {
    "en": "Multiplication table of",
    "es": "Tabla de multiplicar del",
    "cat": "Taula de multiplicar del",
}
const langJSON = JSON.stringify(languages);

fs.writeFile("languages.json", langJSON, (err)=> {
    if(err) throw err;
    console.log("File created");
});