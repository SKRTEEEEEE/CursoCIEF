// document.getElementById("alarma").autoplay = true;
let cambiarFondo = () => {
document.querySelector("body").style.backgroundColor = `rgb(${numAleatorio(0,255)},${numAleatorio(0,255)},${numAleatorio(0,255)})`;
}
let setAlarma = null;
// audio.autoplay = true;

// //setInterval( ) -> es async
// setInterval(()=>{
//     cambiarFondo();
// },5000)

setInterval(()=>{
    document.getElementById("reloj").innerHTML = new Date().toLocaleTimeString();
},1000)
function guardarAlarma(event) {
    event.preventDefault();
    const setAlarmaInput = document.getElementById("setAlarma").value;
    if (setAlarmaInput) {
        setAlarma = setAlarmaInput;
        console.log("Valor de la alarma guardado");
        setInterval(()=>{
            console.log("Valor de la alarma cargado:", setAlarma);
            if(setAlarma && `${setAlarma}:00` == new Date().toLocaleTimeString()){
                console.log("Son las " + new Date().toLocaleTimeString());
                play();
                // document.getElementById("alarma").play();
            }
        },1000)
    } else {
        console.log("No se encontró el elemento con id 'setAlarma'");
    }
}
function play(){
    const audio = document.getElementById("alarma");

    // audio.play();
    audio.autoplay = true;
    setInterval(()=>{
        cambiarFondo();
    },5000)
}
function numAleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}