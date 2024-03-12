// TO-DO APP v1.0.0
// 2024-03-08



let listaTareas = []
const htmlPendiente = document.getElementById("pendiente")
const htmlEjecucion = document.getElementById("ejecucion")
const htmlFinalizada = document.getElementById("finalizada")

let formulario = document.getElementById("form")

//ejecucion evento submit
formulario.addEventListener("submit", (e) => {
  //evitar comportamiento default
    e.preventDefault();
    // const descripcion = document.getElementById("description").value

    //crear objeto y añadir tarea con el valor del formulario a pendiente
    const tarea = {
        id: new Date().getTime(),
        descripcion : formulario[0].value,
        estado :"pendiente"
    }
    listaTareas.push(tarea)
    //Resetear
    formulario.reset();
    //Recuperar el autofocus
    formulario[0].focus();
    // console.log(listaTareas);
    //Rehidratacion
    mostrarTareas();
})
//borrar tarea
function borrarTarea(id) {
  //Buscar en el array lista de tareas el que tenga el mismo id que el _id que se le pasa a la func
  const tarea = listaTareas.find(tarea => tarea.id === id)
  //Si existe se borra ese
  if(tarea) {
    //Buscamos el index de la tarea en concreto para luego eliminarlo
    const index = listaTareas.indexOf(tarea);
    //el index del array que vamos a eliminar y la cantidad
    listaTareas.splice(index, 1);
  }
  console.log("deleted: ", id);
  //Forma alternativa/senzilla de eliminar
  // for (let index = 0; index < listaTareas.length; index++) {
  //   if (listaTareas[index].id === id) {
  //     listaTareas.splice(index, 1);
  //     break;
  //   }
  // }
  //Rehidratacion
  mostrarTareas()
}
//cambiar estado
const cambiarEstado = (id, estado) => {
  console.log("id: ", id, "estado: ", estado);
  const tarea = listaTareas.find(tarea => tarea.id === id)
  //Reasignamos el estado de la tarea con la nueva tarea
  tarea.estado = estado
  //Rehidratamos
  mostrarTareas();
}
//funcion encargada de la rehydratancion, aka se encarga de poner los strings, cada vez que se llama
function mostrarTareas(){
    let tareasPendiente = "";
    let tareasEjecucion = "";
    let tareasFinalizadas = "";

    for (let index = 0; index < listaTareas.length; index++) {
        switch (listaTareas[index].estado){
            case "pendiente":
            tareasPendiente += `
            <div class="lista-tareas tarea-pendiente">
            <p id="${listaTareas[index].id}">${listaTareas[index].descripcion}</p>
            <p>
              <span class="boton boton-borrado" onclick="borrarTarea(${listaTareas[index].id})">
                <i class="fa-solid fa-trash-can"></i>
              </span>
              <span class="boton boton-finalizada" onclick="cambiarEstado(${listaTareas[index].id}, 'finalizada')">
                <i class="fa-solid fa-circle-check"></i>
              </span>
              <span class="boton boton-ejecucion" onclick="cambiarEstado(${listaTareas[index].id}, 'ejecucion')">
                <i class="fa-solid fa-person-digging"></i>
              </span>
              <span class="boton boton-pendiente" onclick="cambiarEstado(${listaTareas[index].id}, 'pendiente')">
                <i class="fa-regular fa-clipboard"></i>
              </span>
            </p>
            </div>
            `
            
            break
            case "ejecucion":
            tareasEjecucion += `
            <div class="lista-tareas tarea-ejecucion">
            <p id="${listaTareas[index].id}">${listaTareas[index].descripcion}</p>
            <p>
              <span class="boton boton-borrado" onclick="borrarTarea(${listaTareas[index].id})">
                <i class="fa-solid fa-trash-can"></i>
              </span>
              <span class="boton boton-finalizada" onclick="cambiarEstado(${listaTareas[index].id}, 'finalizada')">
                <i class="fa-solid fa-circle-check"></i>
              </span>
              <span class="boton boton-ejecucion" onclick="cambiarEstado(${listaTareas[index].id}, 'ejecucion')">
                <i class="fa-solid fa-person-digging"></i>
              </span>
              <span class="boton boton-pendiente" onclick="cambiarEstado(${listaTareas[index].id}, 'pendiente')">
                <i class="fa-regular fa-clipboard"></i>
              </span>
            </p>
            </div>
            `
            
            break
            case "finalizada":
            tareasFinalizadas += `
            <div class="lista-tareas tarea-finalizada">
            <p id="${listaTareas[index].id}">${listaTareas[index].descripcion}</p>
            <p>
              <span class="boton boton-borrado" onclick="borrarTarea(${listaTareas[index].id})">
                <i class="fa-solid fa-trash-can"></i>
              </span>
              <span class="boton boton-finalizada" onclick="cambiarEstado(${listaTareas[index].id}, 'finalizada')">
                <i class="fa-solid fa-circle-check"></i>
              </span>
              <span class="boton boton-ejecucion" onclick="cambiarEstado(${listaTareas[index].id}, 'ejecucion')">
                <i class="fa-solid fa-person-digging"></i>
              </span>
              <span class="boton boton-pendiente" onclick="cambiarEstado(${listaTareas[index].id}, 'pendiente')">
                <i class="fa-regular fa-clipboard"></i>
              </span>
            </p>
            </div>
            `

            break
        }
        
    }
    htmlPendiente.innerHTML = tareasPendiente;
    htmlEjecucion.innerHTML = tareasEjecucion;
    htmlFinalizada.innerHTML = tareasFinalizadas;
}




// function solucion1() {
//     alert("Soy un onclick en el HTML")
// }

// document.getElementById("id2").onclick = () => {alert("Soy un onclick desde JS ")}

// document.getElementById("id3").addEventListener("click", () => { alert("soy un eventListener")})