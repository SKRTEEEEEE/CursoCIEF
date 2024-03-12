// Se te proponen una serie de ejercicios para practicar
// los arrays y el bucle for.

// Para resolver NO hay que utilizar ninguna funciÃ³n matemÃ¡tica
// Crea el cÃ³digo necesario para resolver los requerimientos

// Dado este array:
let arrayNumeros1 = [4, 5, 3, 8, 2, 7, 1, 6]
let arrayNumeros2 = [4, 2, 7, 1, 6]
// o cualquier otro array solo con nÃºmeros

// 1) Mostrar por consola la suma de todos los valores
function sumarArray(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        suma += array[i];
    }
    return suma;
}
console.log("Suma del primer array:", sumarArray(arrayNumeros1));
console.log("Suma del segundo array:", sumarArray(arrayNumeros2));
console.log("Suma todos los arrays: ", sumarArray(arrayNumeros1)+sumarArray(arrayNumeros2));


// 2) Mostrar por consola el promedio
function promedioArray(array) {
    let suma = sumarArray(array);
    return suma / array.length;
}
console.log("Promedio del primer array:", promedioArray(arrayNumeros1));
console.log("Promedio del segundo array:", promedioArray(arrayNumeros2));

// 3) Encontrar los valores mÃ¡ximo y mÃ­nimo
console.log("Valor máximo del primer array:", Math.max(...arrayNumeros1));
console.log("Valor mínimo del primer array:", Math.min(...arrayNumeros1));
console.log("Valor máximo del segundo array:", Math.max(...arrayNumeros2));
console.log("Valor mínimo del segundo array:", Math.min(...arrayNumeros2));

// 4) Sumar los valores con Ã­ndice par y restar los impares
function sumarParesRestarImpares(array) {
    let resultado = 0;
    for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
            resultado += array[i]; 
        } else {
            resultado -= array[i]; 
        }
    }
    return resultado;
}
console.log("Resultado del primer array:", sumarParesRestarImpares(arrayNumeros1));
console.log("Resultado del segundo array:", sumarParesRestarImpares(arrayNumeros2));

// Hay que mostrar por consola cada resultado

// Dado estos arrays:
let arrayNombres1 = ["Federico", "KayÃ³n", "LuÃ­s", "MÃ³nica", "NicolÃ¡s", "Ricardo", "Sara", "Stephanie", "Yahved"]
let arrayNombres2 = ["Clint", "Robert", "James", "Anne", "Ingrid", "John", "Patricia", "Marie"]

// 5) Encontrar el elemento con el texto mÃ¡s largo y guardarlo en la variable varTextoMasLargo
// Si hay mÃ¡s de un valor, guardarlos en el array arrayTextosMasLargos.
function encontrarTextoMasLargo(array) {
    let textoMasLargo = "";
    let longitudMasLarga = 0;
    let arrayTextosMasLargos = [];
    
    for (let i = 0; i < array.length; i++) {
        let textoActual = array[i];
        let longitudActual = textoActual.length;
        
        if (longitudActual > longitudMasLarga) {
            textoMasLargo = textoActual;
            longitudMasLarga = longitudActual;
            arrayTextosMasLargos = [textoActual];
        } else if (longitudActual === longitudMasLarga) {
            arrayTextosMasLargos.push(textoActual);
        }
    }
    
    return arrayTextosMasLargos.length === 1 ? textoMasLargo : arrayTextosMasLargos;
}
console.log("Elemento con el texto más largo en el primer array:", encontrarTextoMasLargo(arrayNombres1));
console.log("Elemento con el texto más largo en el segundo array:", encontrarTextoMasLargo(arrayNombres2));

// 6) Lo mismo para el texto mÃ¡s corto.
function encontrarTextoMasCorto(array) {
    let textoMasCorto = array[0]; 
    let longitudMasCorta = textoMasCorto.length;
    let arrayTextosMasCortos = [textoMasCorto];
    
    for (let i = 1; i < array.length; i++) {
        let textoActual = array[i];
        let longitudActual = textoActual.length;
        
        if (longitudActual < longitudMasCorta) {
            textoMasCorto = textoActual;
            longitudMasCorta = longitudActual;
            arrayTextosMasCortos = [textoActual];
        } else if (longitudActual === longitudMasCorta) {
            arrayTextosMasCortos.push(textoActual);
        }
    }
    
    return arrayTextosMasCortos.length === 1 ? textoMasCorto : arrayTextosMasCortos;
}
console.log("Elemento con el texto más corto en el primer array:", encontrarTextoMasCorto(arrayNombres1));
console.log("Elemento con el texto más corto en el segundo array:", encontrarTextoMasCorto(arrayNombres2));

// 7) ObtÃ©n un array llamado longitudNombres que tenga como elementos las longitudes de los textos
// incluidos en cualquiera de los arrays anteriores. Por tanto debes mostrar : [ 8, 5, 4, etc.
console.log("Longitudes de los textos en el primer array:", arrayNombres1.map(nombres => nombres.length));
console.log("Longitudes de los textos en el segundo array: ", arrayNombres2.map(nombre=>nombre.length));

// 8) Crea un array llamado arrayNombresConI que incluya solo los nombres que contengan la letra i
console.log("Nombres con la letra 'i' en el primer array:", arrayNombres1.filter(nombre => nombre.toLowerCase().includes("i")));
console.log("Nombres con la letra 'i' en el segundo array:", arrayNombres2.filter(nombre => nombre.toLowerCase().includes("i")));


// Dado este array:
let arrayMixto = [ "Marie", 24, "Pol", 18, "Judith", 22, "Eva", 28 ]

// 9) Debes obtener otro array llamado arrayBidimensional que sea asÃ­:
// [ ["Marie", 24 ], ["Pol", 18], ["Judith", 22 ], [ "Eva", 28] ]
let arrayBidimensional = [];
for (let i = 0; i < arrayMixto.length; i += 2) {
    arrayBidimensional.push([arrayMixto[i], arrayMixto[i + 1]]);
}
console.log("array Bidimensional: ", arrayBidimensional);
// 10) A partir de un array como el que has obtenido en el ejercicio 9,
// debes resolver los ejercios 1, 2, 3 y 4
//Sumar array
function sumarArrBi(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        suma += array[i][1]; 
    }
    return suma;
}
console.log("Suma array bidimensional: ", sumarArrBi(arrayBidimensional));
//Mostrar media
function mediaArrBi(array){
    let suma = sumarArrBi(array);
    return suma / array.length;
}
console.log("Media array bidimensional: ", mediaArrBi(arrayBidimensional));
//Mostrar minimo y maximo
function encontrarMinimoBi(array) {
    let res = array[0][1];
    for (let i = 1; i < array.length; i++) {
        if (array[i][1] < res) {
            res = array[i][1];
        }
    }
    return res;
}
function encontrarMaximoBi(array) {
    let res = array[0][1]; 
    for (let i = 1; i < array.length; i++) {
        if (array[i][1] > res) {
            res = array[i][1];
        }
    }
    return res;
}
console.log("Valor mínimo:", encontrarMinimoBi(arrayBidimensional));
console.log("Valor máximo:", encontrarMaximoBi(arrayBidimensional));
//Sumar numeros con indice par y restar los que tengan indice inpar

function sumarParesRestarImparesBi(array) {
    let resultado = 0;
    for (let i = 0; i < array.length; i++) {
        let valor = array[i][1]; 
        if (i % 2 === 0) {
            resultado += valor; 
        } else {
            resultado -= valor; 
        }
    }
    return resultado;
}

// Mostrar el resultado por consola
console.log("Suma numeros con indice par y resta de los que tienen el indice impar :", sumarParesRestarImparesBi(arrayBidimensional));
