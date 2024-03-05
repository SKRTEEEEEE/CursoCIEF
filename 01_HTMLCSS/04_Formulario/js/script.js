//05/03/2006

let hoy = new Date()
//Todo como si fuera un array osea con posiciones
//dia actual del mes-> getDate(), Dia de la semana-> getDay(), mes-> getMonth(), year-> getFullYear()
//
diaHoy = hoy.getDay()
console.log(diaHoy);

function cambioDeColor() {
    let color = document.getElementById("color").value
    console.log(color);
    let body = document.querySelector("body");
    body.style.backgroundColor = color;
}

function degradado() {
    let color1 = document.getElementById("color-1").value
    let color2 = document.getElementById("color-2").value
    let body = document.querySelector("body")
    body.style.backgroundImage = `linear-gradient(60deg, ${color1}, white ,${color2})`
}

function degradadoConico() {
    let color3 = document.getElementById("color-3").value
    let color4 = document.getElementById("color-4").value
    let conic = document.querySelector(".conic")
    conic.style.backgroundImage = `conic-gradient(${color3}, ${color4})`
}
function obtenerFecha() {
   
    let fecha = document.getElementById("fecha").value
    console.log(fecha);
    let respuesta = document.querySelector(".mayor")
    fecha = fecha.split("-")
    if (fecha[0]<2006){
        respuesta.innerHTML = "mayor de edad"
        respuesta.style.color = "green"
    } else if(fecha[0]==2006 && fecha[1]<3){
        respuesta.innerHTML = "mayor de edad"
        respuesta.style.color = "green"
    } else if (fecha[0]==2006 && fecha[1]==3&& fecha[2]<5){
        respuesta.innerHTML="mayor de edad"
        respuesta.style.color = "green"
    } else {
        respuesta.innerHTML= "<div>menor de edad</div>"
        respuesta.style.color = "red"
    }
}
function obtenerInfoSelectSimple(){
    let datoSelect = document.getElementById("cars").value
    console.log("datoSelect: ", datoSelect);
}
function obtenerInfoSelectMulti() {
    let selectMulti = document.getElementById("cars2").options
    console.log("selectMulto .options: ",selectMulti);
    let arrayEleccion = []
    for (let index = 0; index < selectMulti.length; index++) {
        if(selectMulti[index].selected){arrayEleccion.push(selectMulti[index].value)}      
    }
    console.log("Tus marcas preferidas son: ", arrayEleccion);
}