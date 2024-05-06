
let cambiarFondo = () => {
document.querySelector("body").style.backgroundColor = `rgb(${numAleatorio(0,255)},${numAleatorio(0,255)},${numAleatorio(0,255)})`;
}
let setAlarma = null;

// //setInterval( ) -> es async
// setInterval(()=>{
//     cambiarFondo();
// },5000)

setInterval(()=>{
    // console.log(Date().);
    console.log("Valor de la alarma cargado:", setAlarma);
    if(setAlarma && `${setAlarma}:00` == new Date().toLocaleTimeString()){
        console.log("Son las " + new Date().toLocaleTimeString());
        play();
        // document.getElementById("alarma").play();
    }
    
    console.log();
    document.getElementById("reloj").innerHTML = new Date().toLocaleTimeString();
},1000)
function guardarAlarma(event) {
    event.preventDefault();
    const setAlarmaInput = document.getElementById("setAlarma").value;
    if (setAlarmaInput) {
        setAlarma = setAlarmaInput;
        console.log("Valor de la alarma guardado:", setAlarmaInput);
        // compararAlarma();
    } else {
        console.log("No se encontró el elemento con id 'setAlarma'");
    }
}
function play(){
    var audio = document.getElementById("alarma");
    audio.play();
    setInterval(()=>{
        cambiarFondo();
    },5000)
}



// function numAleatorio(min,max){
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }