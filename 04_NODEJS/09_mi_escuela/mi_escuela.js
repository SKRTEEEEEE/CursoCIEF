// Para una escuela de idiomas, hace falta saber:
// 1) que alumnos son menores de edad, ya que se pasa la información de su asistencia a los padres
// 2) que alumnos son mayores de 65, ya que disponen de un descuento en la matrícula, a razón de
// un 5% por cada año que pasen de 64.

const {alumnos, precioBaseMatricula} = require('./alumnos');


// Función que indique para los alumnos menores de edad
// su nombre, cuantos años tienen y cuantos días les faltan para cumplir 18
// De este modo:
// Pepa Pi tienes 17 años y te faltan 32 días para cumplir 18 años.

// Función que indique que alumnos pasan de 65 años, a qué descuento tienen derecho y
// cuanto costaría su matrícula. Por ejemplo:
// Pau Guerra tienes 66 años, tu descuento es del 10% y el importe de tu matrícula es de 225 € 
const hoy = new Date();

function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function diasParaCumplir(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    const proximoCumple = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    if (hoy > proximoCumple) {
        proximoCumple.setFullYear(hoy.getFullYear() + 1);
    }
    const diferencia = proximoCumple - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

function alumnosMenoresDeEdad(alumnos) {
    return alumnos
        .filter(alumno => {
            const edad = calcularEdad(alumno.fecha_nacimiento);
            return edad < 18;
        })
        .map(alumno => {
            const edad = calcularEdad(alumno.fecha_nacimiento);
            const diasPara18 = diasParaCumplir(alumno.fecha_nacimiento);
            return `${alumno.nombre} ${alumno.apellido1} tienes ${edad} años y te faltan ${diasPara18} días para cumplir 18 años.`;
        });
}

function alumnosMayoresDe65(alumnos) {
    return alumnos
        .filter(alumno => {
            const edad = calcularEdad(alumno.fecha_nacimiento);
            return edad > 65;
        })
        .map(alumno => {
            const edad = calcularEdad(alumno.fecha_nacimiento);
            const descuento = (edad - 64) * 5;
            const matriculaDescuento = precioBaseMatricula - (precioBaseMatricula * descuento / 100);
            return `${alumno.nombre} ${alumno.apellido1} tienes ${edad} años, tu descuento es del ${descuento}% y el importe de tu matrícula es de ${matriculaDescuento} €`;
        });
}

console.log(alumnosMenoresDeEdad(alumnos));
console.log(alumnosMayoresDe65(alumnos));
// console.log(alumnos)
