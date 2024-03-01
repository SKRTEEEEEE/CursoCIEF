//Juego
let mensajeInicial = `
1 --> Piedra
2 --> Papel
3 --> Tijeras
`
//Ejecuccion juego
let final = true;
do{
    game();
    final = confirm("Quieres seguir jugando?")
} while (final)
//Logica juego
function game(){
    let eleccionJugador = Number(prompt(mensajeInicial))

    alert(`Eleccion jugador: ${getPlayByEnter(eleccionJugador)}`);
    
    let eleccionPc = getRandomInt(1,4)
    
    alert(`Eleccion pc: ${getPlayByEnter(eleccionPc)}`);
    
    if(eleccionPc === eleccionJugador){
        alert("Empate")
    } else if(eleccionPc === 1 && eleccionJugador === 2||eleccionPc === 2 && eleccionJugador === 3||eleccionPc === 3 && eleccionJugador === 1){
        alert("Has ganado")
    } else{
        alert("Has perdido")
    }
}
//Traduce el numero a la accion
function getPlayByEnter(eleccion){
    if(eleccion === 1){
        return "piedra"
    }else if(eleccion === 2){
        return "papel"
    }else if(eleccion === 3){
        return "tijeras"
    }else{
        return "Bye"
    }
}
//Fucnion para obtener un rondom de (min-> incluido) numero a (max -> se exluye"no puede salir") numero
function getRandomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min)+min) 
}