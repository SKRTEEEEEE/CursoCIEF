let totalCompra = 0;

//Alternativa onclick

// function comprarFrutas (fruta, precio) {
//     document.getElementById(`${fruta}-card`).onclick = () => {
        
//         let canti = prompt(`Dime qué cantidad de ${fruta} quieres?`);
//         while (isNaN(canti) || canti === null || canti === "" || parseFloat(canti) === 0) {
//             alert("Por favor, introduce una cantidad válida.");
//             canti = prompt(`Dime qué cantidad de ${fruta} quieres?`);
//         }
//         let total = canti * precio;
        
//         let pElement = document.createElement("p");
//         pElement.innerHTML = `${fruta}: ${canti} kg - Total: ${total.toFixed(2)} €`;
    
       
//         let botonBorrar = document.createElement("button");
//         botonBorrar.textContent = "🚮";
//         botonBorrar.onclick = () => {
//             pElement.remove();
//             botonBorrar.remove(); 
//             totalCompra -= total;
//             document.getElementById("preuFinal").textContent = totalCompra.toFixed(2);
//         };
    
//         pElement.appendChild(botonBorrar); 
//         document.getElementById("carrito").appendChild(pElement);
    
//         totalCompra += total;
//         document.getElementById("preuFinal").textContent = totalCompra.toFixed(2);
//     };
// }
//Alternativa addEventListener
//Instanciacion de la funcion
function comprarFrutas (fruta, precio) {
    //Acceso al elemento por el id y llamada a la funcion cuando se haga click
    document.getElementById(`${fruta}-card`).addEventListener("click", () => {
        //preguntar cantidad
        let canti = prompt(`Dime qué cantidad de ${fruta} quieres?`);
        //comprobar cosas que den error a la respuesta
        while (isNaN(canti) || canti === null || canti === "" || parseFloat(canti) === 0) {
            alert("Por favor, introduce una cantidad válida.");
            canti = prompt(`Dime qué cantidad de ${fruta} quieres?`);
        }
        //calcular total
        let total = canti * precio;
        
        //insertar texto con total en un nuevo elemento p
        let pElement = document.createElement("p");
        pElement.innerHTML = `${fruta}: ${canti} kg - Total: ${total.toFixed(2)} €`;
    
       //crear botton para borrarse si se clicka y
        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "🚮";
        botonBorrar.onclick = () => {
            pElement.remove();
            botonBorrar.remove(); 
            totalCompra -= total;
            document.getElementById("preuFinal").textContent = totalCompra.toFixed(2);
        };
        //anexarlo al parrafo y adjuntar ambos elementos al carrito
        pElement.appendChild(botonBorrar); 
        document.getElementById("carrito").appendChild(pElement);
        //sumar al total de la compra y substituir por el actual poniendole dos cifras   
        totalCompra += total;
        document.getElementById("preuFinal").textContent = totalCompra.toFixed(2);
    })  
}
//Llamada a las funciones pasandole sus parametros
comprarFrutas("limon", 1.2)
comprarFrutas("pomelo", 2.5)
comprarFrutas("kiwi", 4.2)
comprarFrutas("piña", 2.8)
comprarFrutas("sandia", 1.2)
comprarFrutas("aguacate", 2.5)
comprarFrutas("freson", 6.2)
comprarFrutas("mandarina", 1.9)
comprarFrutas("manzanaFuji", 4.2)
comprarFrutas("platano", 3.2)
comprarFrutas("pera", 1.8)
comprarFrutas("manzanaGolden", 3.5)
