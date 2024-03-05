/*ARRAYS
Crear arrays*/
let arrayFrutas = ["pera", "kiwi",,,,,,,,,,, "mango",1,2.3,false, [],{}, null] //Al añadir comas añadimos posiciones vacias
let arrayPalabras = ["bla0", "bla", 3, "frasco"]
let array1 = new Array(4);//dentro de array podemos crear posiciones vacias(undefined)
console.log(arrayFrutas.length);
//con el .at() podemos tirar para atras, con el [] no
console.log(arrayFrutas.at(-5))
//toString(), split()
let arrayToString = arrayFrutas.toString()
console.log(arrayToString)
let stringToArray = arrayToString.split(",")
console.log(stringToArray);
/* Otros como:
     .join() -> juntar con un separados
     .push() -> subir un elemento en la ultima posicion
     .pop() -> quitar ultimo elemento
     .shift() -> quitar primer elemento
     .unshift() -> poner un item en el primer elemento
*/
let ultimaPalabra = arrayPalabras.pop()
let primeraPalabra = arrayPalabras.shift()
arrayPalabras.unshift(ultimaPalabra)
console.log(arrayPalabras);
console.log(ultimaPalabra);
/* Otros como:
     .reverse() -> gira el array
     .sort() -> ordenar "sortear"
     .toSorted() -> modifica el arr original pero creando una copia
     .includes("_palabra") -> buscamos dentro de el array si esta _palabra
     .indexOf("_palabra") -> buscamos dentro de el array la posicion de _palabra(si no esta -1)
*/
let arrPalabras = arrayPalabras.toSorted();
console.log("arrPalabras: ", arrPalabras );
console.log( "arrayPalabras: ", arrayPalabras);
/* Otros como:?
     .slice() -> retorna una copia de una seccion se un array
     .splice() -> añadir un elemento sacado de un arr
*/
let resultadoSplice = arrayPalabras.slice(1,3);
console.log("arrayPalabras: ", arrayPalabras );
console.log( "resultadoSplice: ", resultadoSplice);