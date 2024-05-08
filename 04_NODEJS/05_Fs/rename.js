const fs = require("node:fs");

// fs.readdir("./", (err, files)=> {
//     if(err) {
//         throw err;
//     } else {
//         console.log(files);
//     }
// })

// fs.rename("./text1.txt", "./text2.txt", (err)=> {
//     if(err) {
//         throw err;
//     } else {
//         console.log("Fichero renombrado a ./text2.txt");
//     }
// })


// Función recursiva

cambiarNombre("text1.txt", "text2.txt");

function cambiarNombre(old, newP) {
    fs.rename(old,newP , (err)=> {
    if(err) {
        cambiarNombre(newP, old)
    } else {
        console.log("Fichero renombrado");
    }
})
}