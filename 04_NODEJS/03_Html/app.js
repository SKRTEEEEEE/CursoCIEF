import lib from "./calculadora.js";

const {sumar, restar} = lib;

console.log(lib);
console.log(sumar(1,2));
console.log(restar(100,2));

document.querySelector("p").innerHTML= "Hola!"