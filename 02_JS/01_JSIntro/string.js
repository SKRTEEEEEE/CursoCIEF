let texto_1 = "Hola Mundo"

//  slice

texto_1 = texto_1.slice(5)
console.log(texto_1)

// concat

let texto_2 = texto_1.concat(" loco")
console.log(texto_2)

// trim -> Quitar espacios

let usuario = "             Maria              ";
usuario = usuario.trim();
console.log(usuario);

// repeat -> Repetir

texto_2 = texto_1.repeat(2)
console.log(texto_2)

// replace -> reemplazar, solo la primera aparicion

let frase = "Hoy es Jueves";
console.log(frase.replace("Jueves", "Viernes"));
let frase2 = "Me gusta mucho mucho mucho Javascript"
console.log(frase2.replace("mucho", "poco"));

// replaceAll -> reemplazar, todas las ocurrencias

console.log(frase2.replaceAll("mucho", "poco"));

// split -> convierte un string en array

let nombre = "Peter Pan"
//Asi para dividirlo en cada posicion
// console.log(nombre.split(""))
let nombreOrdenado = nombre.split(" ")[1] + ", " + nombre.split(" ")[0]
console.log(nombreOrdenado)
console.log(nombre.split(" "))



//MINI EJERCISIO

function changeName(name) {
    let newName;
    let trying = name.trim().split(", ")
    if(trying[1] === undefined){
        let firstLetter = trying[0].charAt(0).toUpperCase()
        let firstWord = firstLetter + trying[0].slice(1)
        newName = firstWord
        return newName;
    }
    let firstLetter = trying[0].charAt(0).toUpperCase()
    let firstWord = firstLetter + trying[0].slice(1)
    let secondLetter = trying[1].charAt(0).toUpperCase()
    let secondWord = secondLetter + trying[1].slice(1)
    newName = secondWord + " " + firstWord
    if (newName.split(" ").length > 2){
        newNameSplitted = newName.split(" ");
        let newNameLong =""
    for(let i = 0; i < newNameSplitted.length; i++){
        let words = newNameSplitted[i].charAt(0).toUpperCase()
        let word = words + newNameSplitted[i].slice(1)
        newNameLong += word + " ";
        }    
        newNameLong = newNameLong.trim();
        return newNameLong;
    } else {
    return newName
    }
}

let cliente = "        poppins, mary     "
let cliente2 = "                   mouse, micky "
let cliente3 = "                      de los anillos, el señor"
let cliente4 = "                     spider-man    "

console.log(changeName(cliente))
console.log(changeName(cliente2))
console.log(changeName(cliente3))
console.log(changeName(cliente4))
// Fecha
let fecha = "29-02-2024"
//2024-02-29

fecha = `${fecha.split("-")[2]}-${fecha.split("-")[1]}-${fecha.split("-")[0]}`
console.log(fecha)