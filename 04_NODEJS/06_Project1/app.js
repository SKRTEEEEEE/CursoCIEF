const fs = require("node:fs");
const path = require("node:path");
const pc = require("picocolors");
const resultado = (operador) => {
    let result = "";
    for(let i = 1; i <= 10; i++) {
        result += `${operador} x ${i} = ${operador * i}\n`;
    }
    return result;
}

console.log(pc.bgBlue(pc.green("Hello World!")));
if(process.argv.length == 2) {
    let menu = `
    Este programa muestra la tabla de multiplicar del numero que elijas
    Te lo mostrará con el idioma que escojas de los siguiente:
    cat - esp - eng

    Además lo grabará en un fichero
    Ejemplo de uso: ${pc.green("node app.js 3 cat")}
    `
    console.log(menu);
    process.exit(0);
}
const operador = process.argv[2];
const lang = process.argv[3];

const rutaJson = path.join("config", "languages.json")
const jsonLand = fs.readFileSync(rutaJson, "utf-8");
const languages = JSON.parse(jsonLand);
const title = languages[lang].split(" ").join("-").toLowerCase() + "_" + operador;
// console.log("Languges: ", languages);
// console.log(lang) 

let header = `
${pc.bgBlue("==============================")}
${pc.green(languages[lang] + " " + operador)} ->
${pc.bold(resultado(operador) )}
${pc.bgBlue("==============================")}
`
console.log(header);
let saveHeader = `
===========================

${languages[lang] + " " + operador}
${resultado(operador)}
===========================
`

const rutaCarpeta = path.join("txt",lang)
const rutaFichero = path.join("txt",lang,title);

if(!fs.existsSync(rutaCarpeta)){
    console.log(`Esta ruta ${rutaCarpeta} no existía`)
    fs.mkdirSync(rutaCarpeta, {recursive:true})
}
fs.writeFileSync(rutaFichero+".txt", saveHeader, "utf-8")

// fs.open(rutaFichero+".txt", "w", "utf-8", (err)=>  {
//     if(err) {
//         console.log(err);
//         process.exit(1);
//     }
// });



