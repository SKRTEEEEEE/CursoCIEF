/*
DOM -> Document Object Model
- .textContent -> recoje/envia puramente el texto
- .innerText -> recoje/envia puramente el texto

*/
//Recibir del DOM
const parr1 = document.getElementById("parr1")
const textParr1 = document.getElementById("parr1").textContent
console.log(textParr1);

//Enviar al DOM
// document.querySelector("#parr2").textContent = "Soy un parrafo muy interesante"
// document.querySelector("#parr2").innerText = "Soy un parrafo muy interesante"
document.querySelector("#parr2").innerHTML = "<span onclick='textoColorRojo()'>Soy un parrafo <strong>muy interesante</strong></span>"

function textoColorRojo(){
    // const estilo = document.querySelector("#parr2").style
    // estilo.color = "red"
    // estilo.border = "2px solid blue"
    //querySelector().className -> cambiar estilo modificando la etiqueta class
    document.querySelector("#parr2").className = "textoInteresante"
}


/*
Cambiar estilo añadiendo a la etiqueta class
querySelector().classList -> 
*/
// document.querySelector("#parr1").onclick = cambiarEstilo

// function cambiarEstilo() {
//     document.querySelector("#parr1").classList.add = "textoInteresante"
// }


/* ------------ ------------- ----------- ------------ ------------- -----------
 FUNCION ANONIMA
 hay que tener el cuenta que las funciones anonimams no permiten definirse despues de que se instancian   

 let functionAnonima = function(){
    ....
 }
 
 
*/
// document.querySelector("#parr1").onclick = function () {
//     document.querySelector("#parr1").classList.add = "textoInteresante"
// }
// TO ARROW FUNCTION
document.querySelector("#parr1").onclick =  () => {
    document.querySelector("#parr1").classList.add = "textoInteresante"
}