function eliminar() {
    document.getElementById("miFormulario").reset();
}

function mostrarAlerta() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var adultos = document.getElementById("adultos").value;
    var kids = document.getElementById("kids").value;
    var opciones = document.querySelector('input[name="opciones"]:checked').value;

    alert("Nombre: " + nombre + "\nApellido: " + apellido + "\nAdultos: " + adultos + "\nNiños " + kids + "Regimen comidas: " + opciones)
  }