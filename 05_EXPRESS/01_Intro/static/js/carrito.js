/*
Hay que programar un carrito de compra de fruta.

El cliente eligirá que fruta quiere haciendo click sobre la imagen.
Un mensaje emergente le preguntará qué cantidad quiere.

Esta información se mostrará debajo de "Total carrito", 
en <p id="carrito"></p>, de esta forma:
 Kiwi 2 kg x 4,20€/kg = 8,40 €
 Total Compra: 8,40€
 
Se dará la opción de añadir o no más productos que se mostrarán
a continuación de los anteriores, y se sumará todo en el total. 
Por ejemplo:  
 Kiwi 2 kg x 4, 20€/kg = 8, 40€
 Pomelo 1 kg x 2,50€/kg = 2,50€
 Total Compra: 10,90€

 Lo importante es el cálculo, no los estilos css
 */

 // Crea las constantes que voy a necesitar; artículos y precios como si fuera una base de datos
 const descArticulos=["Pomelo", "Kiwi", "Limón", "Piña", "Sandía"];
 const precArticulos=[2.50,4.20, 1.20, 2.8, 1.20];
 const pedido=[];
 const aPagar=[];

 //Crea una variable global para almacenar el indice de la posición de un producto almacenado en la array de los productos (descArticilos)
 // Es como si escribiera la id de un artículo dentro de una base de datos
 var pos;

 //Cada funcion está enlazada a una imagen de prodcuto con evento click que la ejecuta. Con esto obtengo el indice del artículo que almaceno te poalmente en la cariable "pos"
function aranja() {pos = descArticulos.indexOf('Pomelo');lineaPedido()}
function kiwi() {pos = descArticulos.indexOf('Kiwi');lineaPedido()}
function llimones() {pos = descArticulos.indexOf('Limón');lineaPedido()}
function pinya() {pos = descArticulos.indexOf('Piña');lineaPedido()}
function sindria() {pos = descArticulos.indexOf('Sandía');lineaPedido()}

// Con esta funcion escribo en una matriz (pedido) cada linea de pedido de los productos que el cliente compra
function lineaPedido() {

    //Pido la cantidad y almaceno el dato en la variable
    let cantidadAranjas = prompt(descArticulos[pos], "Indique cantidad");

    //Calculo el importe y almaceno el dato en la variable. 
    let importeAranjas=(cantidadAranjas * precArticulos[pos]);

    //Preparo el mensaje de salida y almaceno el dato en la variable. Redondeo con toFixed(2)
    let importeLinea=( descArticulos[pos] + " " + cantidadAranjas + " Kg " + " x "  + precArticulos[pos] + " €/Kg. = " +  importeAranjas.toFixed(2) + " € " + "<br/>");
    
    //Escribo en las matrices los datos almacendos en las variables (lineas 49 y 52) 
    pedido.push(importeLinea);
    aPagar.push(importeAranjas);

    //Muestro las lineaas de pedido que se van añadiendo
    document.getElementById("carrito").innerHTML = pedido;

    //Calculo la suma total del pedido sumando los valores de toda la matriz "aPagar"
    let sum=0;
    for (let i = 0; i < aPagar.length; i++) {
         sum += aPagar[i];
     } 

     //Muestro el importe de la venta al final. Formateo a dos decimales  
    document.getElementById("carrito2").innerHTML = "Total compra: "+ (sum.toFixed(2)) +" €"; 

    // pregunto si quiere seguir comprando y muestro mensaje con la pregunta. Segun respuesta esconde los artículos y finaliza
    var mensaje;
    var opcion = confirm("¿Seguir comprando?");
    if (opcion == true) {
        mensaje = "Seguir comprando";
        //alert("Seguir comprando");
	} else {
	    mensaje = "Finalizar compra";
        document.getElementsByClassName("fruites")[0].style.display = "none";
        //alert("Finalizar compra y pagar");
        return;
	}

    //Pongo aqui un medio para validar los datos de entrada de cantidad para elimiar del array el dato erroneo pues ya se ha grabado con anterioridad. 
    if(!isNaN(cantidadAranjas) && cantidadAranjas != null && cantidadAranjas != ""){
        }else if(cantidadAranjas == 'fin'){   
        }else{
        //alert('No es numero. Vuelva a empezar');   
        pedido.pop();
        aPagar.pop();

        //Si nos e cumple se llama a sí misma otra vez
        lineaPedido()
    }


}

function pagar() {
    document.getElementsByClassName("fruites")[0].style.display = "none";
    
}
































// //KIWIS
// function kiwi() {
//     let cantidadKiwis=prompt(descArticulos[1], "Indique cantidad");
//     let importeKiwis=(cantidadKiwis*precArticulos[1]);

//     let importeLinea=( descArticulos[1] + " " + cantidadKiwis + " Kg " + " x "  + precArticulos[1] + " €/Kg. = " +  importeKiwis + " € " + "<br/>");

//     pedido.push(importeLinea);
//     aPagar.push(importeKiwis);

//     document.getElementById("carrito").innerHTML = pedido;
    
//     let sum=0;
//     for (let i = 0; i < aPagar.length; i++) {
//          sum += aPagar[i];
//      } 
    
//     document.getElementById("carrito2").innerHTML = "Total compra: "+ sum +" €"; 

// }

// // LLIMONES
// function llimones() {
//     let cantidadLlimones=prompt(descArticulos[2], "Indique cantidad");
//     let importeLlimones=(cantidadLlimones*precArticulos[2]);

//     let importeLinea=( descArticulos[2] + " " + cantidadLlimones + " Kg " + " x "  + precArticulos[2] + " €/Kg. = " +  importeLlimones + " € " + "<br/>");
    
//     pedido.push(importeLinea);
//     aPagar.push(importeLlimones);

//     document.getElementById("carrito").innerHTML = pedido;
    
//     let sum=0;
//     for (let i = 0; i < aPagar.length; i++) {
//          sum += aPagar[i];
//      } 
    
//     document.getElementById("carrito2").innerHTML = "Total compra: "+ sum +" €"; 

// }


// // PINYA
// function pinya() {
//     let cantidadPinya=prompt(descArticulos[3], "Indique cantidad");
//     let importePinya=(cantidadPinya*precArticulos[3]);

//     let importeLinea=(descArticulos[3] + " " + cantidadPinya + " Kg " + " x "  + precArticulos[3] + " €/Kg. = " +  importePinya + " € " + "<br/>");

//     pedido.push(importeLinea);
//     aPagar.push(importePinya);

//     document.getElementById("carrito").innerHTML = pedido; 

//     let sum=0;
//     for (let i = 0; i < aPagar.length; i++) {
//          sum += aPagar[i];
//      } 
    
//     document.getElementById("carrito2").innerHTML = "Total compra: "+ sum +" €"; 
// }


// // SINDRIA
// function sindria() {
//     let cantidadSindria=prompt(descArticulos[4], "Indique cantidad");
//     let importeSindria=(cantidadSindria*precArticulos[4]);

//     let importeLinea=(descArticulos[4] + " " + cantidadSindria + " Kg " + " x "  + precArticulos[4] + " €/Kg. = " +  importeSindria + " € " + "<br/>");

//     pedido.push(importeLinea);
//     aPagar.push(importeSindria);

//     document.getElementById("carrito").innerHTML = pedido; 

//     let sum=0;
//     for (let i = 0; i < aPagar.length; i++) {
//          sum += aPagar[i];
//      } 
    
//     document.getElementById("carrito2").innerHTML = "Total compra: "+ sum +" €"; 

// }





