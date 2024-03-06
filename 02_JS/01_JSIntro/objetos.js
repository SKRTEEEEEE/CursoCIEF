/*
Objetos
clave:valor->key:value
*/

let arr = ["Maria", "Can", 24, ["Plaça Sant Jaume",2], ["HTML", "CSS"], true,1200]
let objeto = {
    nombre: "Maria",
    apellido: "Can",
    edad: 24,
    direccion: {
        calle: "Plaça Sant Jaume",
        numero: 2
    },
    lenguajes: ["HTML", "CSS"],
    estudiando: true,
    sueldoNeto: 1200,
    actividad: function () {
        console.log("Estoy estudiando mucho Javascript");
    },
    "vive en Barcelona": true,
    "cantidad de estudio": "regular"
}

objeto.actividad();
console.log(objeto.direccion.numero);
console.log(objeto["sueldoNeto"])
console.log(objeto["vive en Barcelona"]);
console.log(objeto["cantidad de estudio"]);

//Crear objetos

let arr2 = new Object()
let arr3 = {}

//Poblar objetos

arr2.name= "Leche"
arr2.precio = 2
arr2.oferta = true

//Eliminar clave

delete arr2.oferta
console.log(arr2);

//Desestructuracion

let {nombre:nombreEstudiante} = objeto
console.log(nombreEstudiante);

//JSON -> JavaScript Object Notation

const json = {
    "nombre": "Maria",
    "apellido": "De la O"
}

