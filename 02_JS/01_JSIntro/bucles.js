//Estructuras iterativas

//FOR -> recurre un bucle un numero determinado de veces

let listaAlumnos = ["Sara", "Noa", "Jose", "Pau", "Francisco", "Marta"]
let texto = "Hola"
for (let i=0; i < texto.length; i++){console.log(texto[i]);}
// for (let i = 0; i < lista.length; i++) {
//     console.log(listaAlumnos[i]);  
// }
/*
Descubrir el nombre mas largo
La salida debe ser -> _XXXX tiene el nombre mas largo
*/
posicion = 0;
maximo = 1;
for (let i = 0; i < listaAlumnos.length; i++) {
    
    const element = listaAlumnos[i];
    console.log("listaAlumnos", listaAlumnos[posicion]);
    console.log(element, element.length);
    if(element.length === listaAlumnos[posicion].length){
        maximo = element.length;
        posicion = i;
    } else if (element.length > listaAlumnos[posicion].length){
        maximo = element.length
        posicion = i
    }
    console.log(posicion)
    console.log(maximo);    
}
console.log(posicion);
console.log(`${listaAlumnos[posicion]} tiene el nombre mas largo con ${maximo} letras`);

// WHILE -> mientras algo se cumpla el codigo se va acumplir

let condicion = 0
while(condicion===0){
 console.log("Hola mundo");
 condicion++
}
//Ejemplo

const limite = 10;
const table = 10;
let inicio = 1;

while(inicio <= limite){
    console.log(`${table} x ${inicio} = ${table*inicio}`);
    inicio++;
}

// DO WHILE -> Hace algo mientras..

let password = "1234"
let input = "";
do{
    input = prompt("Introduce la contraseña:","")
} while (password !== input)