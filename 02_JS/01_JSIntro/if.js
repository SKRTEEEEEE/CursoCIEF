//Estructura condicional - sirve para hacer condiciones

let diaSemana = "vIernes"
diaSemana = diaSemana.toLowerCase()

// if (diaSemana == "jueves") {
//     console.log("No es viernes")
// } else if ( diaSemana == "viernes"){
//     console.log("Es viernes")
// } else {
//     console.log("No es jueves ni viernes");
// }

if (diaSemana == "sabado" || diaSemana == "domingo") {
    console.log("Finde")
} else if ( diaSemana == "viernes"){
    console.log("Es viernes")
} else {
    console.log("A estudiar");
}

//Ejercicio

menu = {
    lunes: "ensalada", 
    martes: "sardinas",
    miercoles: "pollo",
    jueves: "paella",
    viernes: "salmon",
    sabado: "pizza",
    domingo: "calçots",
}
let dia = "viernes";
dia = dia.toLowerCase();
mensaje = "Hoy toca "

if (dia === "lunes"){
    console.log(`${mensaje + menu.lunes}`);
} else if(dia === "martes") {
    console.log(`${mensaje + menu.martes}`);
} else if(dia === "miercoles") {
    console.log(`${mensaje + menu.miercoles}`);
} else if(dia === "jueves") {
    console.log(`${mensaje + menu.jueves}`);
} else if(dia === "viernes") {
    console.log(`${mensaje + menu.viernes}`);
} else if(dia === "sabado") {
    console.log(`${mensaje + menu.sabado}`);
} else {
    console.log(`${mensaje + menu.domingo}`)
}

//SWITCH