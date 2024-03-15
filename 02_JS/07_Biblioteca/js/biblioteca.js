// Pon aquí tu nombre : 


// MINI BIBLIOTECA

const biblioteca = [
    { titulo: "Guerra y Paz", autor: "Lev Tolstoi", categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Anna Karenina", autor: "Lev Tolstoi", categoria: "drama", idioma: "català", epoca: "s.XIX" },
    { titulo: "L'Odisea", autor: "Homero", categoria: "drama", idioma: "català", epoca: "clásica" },
    { titulo: "Antologia de la poesia medieval catalàna", autor: "Diversos", categoria: "poesia", idioma: "català", epoca: "clásica" },
    { titulo: "La Ilíada", autor: "Homero", categoria: "drama", idioma: "español", epoca: "clásica" },
    { titulo: "Poema del Mio Cid", autor: "Anónimo", categoria: "poesia", idioma: "español", epoca: "clásica" },
    { titulo: "Veinte mil leguas de viaje submarino", autor: "Jules Verne", categoria: "aventuras", idioma: "español", epoca: "s.XIX" },
    { titulo: "De la Terra a la Lluna", autor: "Jules Verne", categoria: "aventuras", idioma: "català", epoca: "s.XIX" },
    { titulo: "Cinco semanas en globo", autor: "Jules Verne", categoria: "aventuras", idioma: "español", epoca: "s.XIX" },
    { titulo: "Robinson Crusoe", autor: "Daniel Defoe", categoria: "aventuras", idioma: "català", epoca: "clásica" },
    { titulo: "Germinal", autor: 'Émile Zola', categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Notre Dame de Paris", autor: 'Victor Hugo', categoria: "drama", idioma: "català", epoca: "s.XIX" },
    { titulo: "Los Miserables", autor: 'Victor Hugo', categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Yo, robot", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Fundació", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "Ciberiada", autor: "Stanislaw Lem", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Solaris", autor: "Stanislaw Lem", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "El hombre bicentenario", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Tokio Blues", autor: "Haruki Murakami", categoria: "drama", idioma: "español", epoca: "s.XX" },
    { titulo: "Romancero Gitano", autor: "Federico García Lorca", categoria: "poesia", idioma: "español", epoca: "s.XX" },
    { titulo: "Los aventuras de Sherlock Holmes", autor: 'Arthur Conan Doyle', categoria: "misterio", idioma: "español", epoca: "s.XIX" },
    { titulo: "Rebelió a la granja", autor: 'George Orwell', categoria: "drama", idioma: "català", epoca: "s.XX" },
    { titulo: "La Divina Comedia", autor: "Dante Alighieri", categoria: "drama", idioma: "español", epoca: "clásica" },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "Cròniques Marcianes", autor: "Ray Bradbury", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
]


//Ejercicio 5 -> con un forEach separamos los nombres y los apellidos de los autores
biblioteca.forEach(libro => {
    const autorSplit = libro.autor.split(' '); // Separar el nombre y el apellido del autor
    libro.nombre = autorSplit.slice(0, -1).join(' '); // Obtener el nombre del autor
    libro.autor = autorSplit.slice(-1)[0]; // Obtener el apellido del autor
});
//autor -> apellido del autor, nombre -> nombre del autor
console.log(biblioteca);

//EJ5 -> comments en el ej4
let bibliotecaUser = JSON.parse(localStorage.getItem('bibliotecaUser')) || [];
if (bibliotecaUser.length === 0) {
    bibliotecaUser = biblioteca.concat(bibliotecaUser);
    localStorage.setItem('bibliotecaUser', JSON.stringify(bibliotecaUser));
}


// ==========================================================================================================
// EJERCICIO 1
// Libros disponibleS
// Mostrar la lista de obras alfabéticamente según el título, en forma de lista ordenada

// Llista del llibres

//v1 ejercicio1 original
// let ejercicio1 = document.getElementById("listaLibros")
// let html1 = "<ol>";
// biblioteca.sort((a,b) => {
//     return a.titulo.localeCompare(b.titulo,"es-ES", {numeric: true})
// })
// biblioteca.map(libro => {
//     html1 += `
//         <li>
//         ${libro.titulo}
//         </li>
//          `
// }  )
// html1 += "</ol>";
// ejercicio1.innerHTML = html1;
/*
Se ha creado una funcion para mostrar los nombres y los apellidos de los autores en forma de lista ordenada,
para asi adaptarse a los requisitos del ejercicio 5
*/
function displayLibraryName() {
    const libraryContainer = document.getElementById('listaLibros');
    let html1 = "<ol>";
    
    bibliotecaUser.sort((a,b) => {
        return a.titulo.localeCompare(b.titulo,"es-ES", {numeric: true})
    }); 

    bibliotecaUser.forEach((libro) => {
        html1 += `<li class="autor">${libro.autor}, ${libro.nombre}</li>`;
    });

    html1 += "</ol>";
    libraryContainer.innerHTML = html1;
}

displayLibraryName();




// ==========================================================================================================
// EJERCICIO 2
// Filtrar las obras según los criterios indicados en el formulario.
// Las obras que cumplan las condiciones se mostrarán dentro del div con id salidaFiltrada
// Las obras se mostrarán según aparece en la imagen modelo1.png
// Hay que aplicar algunos estilos que ya están definidos en el css

let formulario = document.getElementById("form-filtrado")
formulario.addEventListener("change", () => {
    const categoriaSeleccionada = formulario.querySelector('input[name="categoria"]:checked').value;
    const idiomaSeleccionada = document.querySelector('input[name="idioma"]:checked').value;
    const epocaSeleccionada = document.querySelector('input[name="epoca"]:checked').value;
    let encontrada = false
    let parrafo = document.getElementById("salidaFiltrada");
    let resultadoHTML = ""
    biblioteca.forEach((libro)=>{
        if(categoriaSeleccionada == libro.categoria && idiomaSeleccionada == libro.idioma && epocaSeleccionada == libro.epoca){
            console.log("gola mundo", libro)
            
            resultadoHTML +=`
            <ul>
            <li>
            <div class="autor"> ${libro.autor}</div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
            </li>
            </ul>  
            `
            encontrada = true;
        } 
    })
    if (!encontrada) {
            resultadoHTML = "No se encontraron flores que coincidan con las selecciones.";
        }
    parrafo.innerHTML = resultadoHTML;
    
})

// ==========================================================================================================
// EJERCICIO 3
// Filtrar por autor
// Selección de obras según el nombre o parte del nombre de un autor.
// Al hacer clic sobre el botón buscar se mostrarán las obras cuyos autores cumplen los requisitos.
// La salida por pantalla será en este formato:
// Isaac Asimov : Yo, robot (ciencia-ficción, idioma : español, época : s.XX) 




// v1 ejercicio 3 original
// let buscador = document.getElementById("form-autor")
// buscador.addEventListener("submit", (e)=>{
//     alert("submit")
//     e.preventDefault();
//     const nombreAutor = buscador.querySelector('input[name="autor"]').value;
//     console.log("nombreAutor", nombreAutor)
//     let resultadoHTML = ""
//     biblioteca.forEach((libro)=>{
//         console.log("comparacion", libro.autor.toLocaleLowerCase().includes(nombreAutor.toLocaleLowerCase()));
//         if(libro.autor.toLocaleLowerCase().includes(nombreAutor.toLocaleLowerCase())){
//             resultadoHTML +=`
//             <ul>
//             <li>
//             <div class="autor"> ${libro.autor}</div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
//             </li>
//             </ul>  
//             `
//         }       
//     })
//     if (!resultadoHTML) {
//             resultadoHTML = "No se encontraron libros que coincidan con las selecciones.";
//         }
//     document.getElementById("salidaAutor").innerHTML = resultadoHTML;
// })

/*
Funcion encargada de buscar el autor o cualquiera que tenga letras en el nombre de un autor, segun lo que ponga el usuario en el input.
Recuperamos la info a traves del querySelector().value
Luego con el if, dentro de el bucle forEach(el cual recorre todos los libros disponibles), comprobamos que libros contienen dicho string insertado por el user 
PD: Hemos modificado el string que se envia en resultadoHTML para que se adapte a las condiciones del ejercicio 5.
    ORIGINAL:
    <div class="autor"> ${libro.autor}</div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
*/
let buscador = document.getElementById("form-autor")
buscador.addEventListener("submit", (e)=>{
    // alert("submit")
    e.preventDefault();
    const nombreAutor = buscador.querySelector('input[name="autor"]').value;
    console.log("nombreAutor", nombreAutor)
    let resultadoHTML = ""
    bibliotecaUser.forEach((libro)=>{
        console.log("comparacion", libro.autor.toLocaleLowerCase().includes(nombreAutor.toLocaleLowerCase()));
        if(libro.autor.toLocaleLowerCase().includes(nombreAutor.toLocaleLowerCase())){
            resultadoHTML +=`
            <ul>
            <li>
            <div class="autor"> ${libro.autor}, ${libro.nombre}</div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
            </li>
            </ul>  
            `
        } 
        
        
        
    })
    if (!resultadoHTML) {
            resultadoHTML = "No se encontraron libros que coincidan con las selecciones.";
        }
    document.getElementById("salidaAutor").innerHTML = resultadoHTML;
})




// ==========================================================================================================
// EJERCICIO 4
// Añadir obra a la biblioteca
// A partir del formulario, añadir obras a la biblioteca
// Conseguir permanencia con LocalStorage
// Actualizar automáticamente el listado de obras del ejercicio 1

//v1 ejercicio 4 original
/*
Creamos una variable bibliotecaUser donde guardaremos los datos del usuario, recuperando los de localStorage("biblotecaUser")
Si la bibliotecaUser esta vacia, concatenamos los datos de muestra y los añadimos al localStorage()
Creamos una funcion updateLocalStorage para actualizar el localStorage cuando añadamos nuevos elementos
y una funcion EXTRA displayLibrary para mostrar los elementos
Creamos la funcion addWork para añadir los campos requeridos en el ejercicio y actualizar el localStorage con la nueva info y rehidratar la informacion

*/
// let bibliotecaUser = JSON.parse(localStorage.getItem('bibliotecaUser')) || [];
// if (bibliotecaUser.length === 0) {
//     bibliotecaUser = biblioteca.concat(bibliotecaUser);
//     localStorage.setItem('bibliotecaUser', JSON.stringify(bibliotecaUser));
// }
// function updateLocalStorage() {
//     localStorage.setItem('bibliotecaUser', JSON.stringify(bibliotecaUser));
// }
// function displayLibrary() {
//     const libraryContainer = document.getElementById('listaObras');
//     libraryContainer.innerHTML = '';
//     bibliotecaUser.sort((a,b) => {
//         return a.titulo.localeCompare(b.titulo,"es-ES", {numeric: true})
//     }) 
//     bibliotecaUser.forEach((libro) => {
//         const obraElement = document.createElement('div');
//         obraElement.innerHTML = `
//             <div>
//             <div class="autor"> ${libro.autor}</div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
//             </div>
//         `;
//         libraryContainer.appendChild(obraElement);
       
//     });
// }
// function addWork(event) {
//     event.preventDefault();
//     const autor = document.getElementById('incluir-autor').value;
//     const titulo = document.getElementById('incluir-titulo').value;
//     const categoria = document.getElementById('incluir-categoria').value;
//     const idioma = document.getElementById('incluir-idioma').value;
//     const epoca = document.getElementById('incluir-epoca').value;
//     bibliotecaUser.push({ autor, titulo, categoria, idioma, epoca });
//     updateLocalStorage();
//     displayLibrary();
//     event.target.reset();
// }
// function borrarLocalStorage(e) {
//     e.preventDefault()
//     localStorage.removeItem('bibliotecaUser');
//     alert("¡localStorage biblioteca borrado!");
//     document.getElementById('listaObras').innerHTML = '';
//     e.target.reset()
// }
// // Llamada a Eventos
// document.getElementById('incluirObra').addEventListener('submit', addWork);
// document.getElementById('reset-local-storage').addEventListener('click', borrarLocalStorage);

// // Mostrar libreria al final del archivo
// displayLibrary();


// ==========================================================================================================
// EJERCICIO 5
//  * Añadir un campo "apellido" para separarlo del campo "nombre", actualmente juntos en la colección de obras.
//    Utilizar ese campo apellido en el ejercicio 3 (para la búsqueda) y en el ejercicio 4 (para la inclusión de más obras).
//    La salida por pantalla en el ejercicio 3 sería así, por ejemplo:
//    Asimov, Isaac : Yo, robot (ciencia-ficción, idioma : español, época : s.XX) 
//    Los autores se mostrarán en orden alfabético descendente (de la A a la Z) según su apellido
/*
A la v1 se le ha añadido un campo "apellido" para separarlo del campo "nombre", en la v1 juntos en la colección. Al igual que mostrarse etc...
*/


function updateLocalStorage() {
    localStorage.setItem('bibliotecaUser', JSON.stringify(bibliotecaUser));
}
function displayLibrary() {
    const libraryContainer = document.getElementById('listaObras');
    libraryContainer.innerHTML = '';
    bibliotecaUser.sort((a,b) => {
        return a.titulo.localeCompare(b.titulo,"es-ES", {numeric: true})
    }) 
    bibliotecaUser.forEach((libro) => {
        const obraElement = document.createElement('div');
        obraElement.innerHTML = `
            <div>
            <div class="autor"> ${libro.autor}, ${libro.nombre} </div> <div class"obra"> <i>${libro.titulo}</i> (${libro.categoria}), ${libro.epoca}</div>
            </div>
        `;
        libraryContainer.appendChild(obraElement);
       
    });
}
function addWork(event) {
    event.preventDefault();
    const autor = document.getElementById('incluir-autor').value;
    const nombre = document.getElementById('incluir-nombre').value;
    const titulo = document.getElementById('incluir-titulo').value;
    const categoria = document.getElementById('incluir-categoria').value;
    const idioma = document.getElementById('incluir-idioma').value;
    const epoca = document.getElementById('incluir-epoca').value;
    bibliotecaUser.push({ autor, nombre, titulo, categoria, idioma, epoca });
    updateLocalStorage();
    displayLibrary();
    displayLibraryName()
    event.target.reset();
}
function borrarLocalStorage(e) {
    e.preventDefault()
    localStorage.removeItem('bibliotecaUser');
    alert("¡localStorage biblioteca borrado!");
    document.getElementById('listaObras').innerHTML = '';
    document.getElementById('listaLibros').innerHTML = '';
    e.target.reset()
}
// Llamada a Eventos
document.getElementById('incluirObra').addEventListener('submit', addWork);
document.getElementById('reset-local-storage').addEventListener('click', borrarLocalStorage);

// Mostrar libreria al final del archivo
displayLibrary();