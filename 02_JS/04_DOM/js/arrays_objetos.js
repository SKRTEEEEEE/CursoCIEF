//Datos de trabajo

const flores = [
    {name: "rosa", color: "rojo", floracion: "primavera", stock: true},
    {name: "rosa", color: "blanco", floracion: "verano", stock: true},
    {name: "jazmin", color: "blanco", floracion: "verano", stock: false},
    {name: "crisantemo", color: "blanco", floracion: "otoño", stock: false},
    {name: "cerezo", color: "blanco", floracion: "primavera", stock: false},
    {name: "clavel", color: "rojo", floracion: "verano", stock: true}
]

flores.sort( (a,b) => {
    //localCompare es para 
    return a.name.localeCompare(b.name, "es-ES", {numeric: true})
})

console.log(flores);

//Mostrarse en el HTML los datos de las flores
//Como lista, cada flor un li
//Flor: rosa, de color: rojo, etc..
flores.map((flor)=>{
    let parrafo = document.getElementById("ejercicio1")
    parrafo.innerHTML +=`
    <ul>
    <li>
    Flor: ${flor.name}, de color: ${flor.color}, que florece en: ${flor.floracion} y ${(flor.stock)?"tenemos stock":"no tenemos stock"}
    </li>
    </ul>  
    `
})

let ejercicio2 = document.getElementById("ejercicio2")
let html2 =""
flores.forEach(flor=>{
    if(flor.color === "blanco" && flor.floracion === "verano"){
        html2 += `<ul>
        <li>
        Flor: ${flor.name}, de color: ${flor.color}, que florece en: ${flor.floracion} y ${(flor.stock)?"tenemos stock":"no tenemos stock"}
        </li>
        </ul>  `
    }
    
})
ejercicio2.innerHTML = html2

//Apartir del form-seleccion, hay que mostrar los datos que corresponden a la seleccion realizada
//Mostrar en forma de lista como los modelos anteriores
//Si no hay flores mostrar un texto -> "No hay ninguna flores que cumpla las condiciones"

/*
    let formulario = document.getElementById("form-seleccion")
    formulario.addEventListener("change", () => {
        const colorSeleccionado = formulario.querySelector('input[name="color"]:checked').value;
        const floracionSeleccionada = document.querySelector('input[name="floracion"]:checked').value;
        const stockSeleccionado = document.querySelector('input[name="stock"]:checked').value;
        console.log('Color seleccionado:', colorSeleccionado);
        console.log('Floración seleccionada:', floracionSeleccionada);
        console.log('Stock seleccionado:', stockSeleccionado);
        let encontrada = false
        let parrafo = document.getElementById("ejercicio3")
        let resultadoHTML = ""
        flores.forEach((flor)=>{
            if(colorSeleccionado === flor.color && floracionSeleccionada === flor.floracion && stockSeleccionado === flor.stock){
                console.log("gola mundo", flor)
                
                resultadoHTML +=`
                <ul>
                <li>
                Flor: ${flor.name}, de color: ${flor.color}, que florece en: ${flor.floracion} y ${(flor.stock)?"tenemos stock":"no tenemos stock"}
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

    */
    




