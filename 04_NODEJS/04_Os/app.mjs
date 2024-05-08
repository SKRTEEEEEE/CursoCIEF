import { uptime, type, userInfo, homedir, platform, arch, cpus, totalmem, freemem } from "node:os";

const reloj = (value) => {
    const segundosTotales = Math.floor(value); // Redondear el tiempo de actividad a segundos totales

    const horas = Math.floor(segundosTotales / 3600); // Calcular las horas
    const minutos = Math.floor((segundosTotales % 3600) / 60); // Calcular los minutos
    const segundos = segundosTotales % 60; // Calcular los segundos

    return `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
};

const tiempoDeActividad = uptime(); // Obtener el tiempo de actividad del sistema en segundos

console.log( reloj(3600));

console.log(`Tiempo de actividad del sistema: ${reloj(tiempoDeActividad)}`);

console.log(
`Info del sistema operativo:  ${type()}
Usuario activo: ${userInfo().username}
Directorio principal: ${homedir()}
Tipo de sistema: ${platform()}
Architecture: ${arch()}
CPUs: ${cpus().length}
Memoria total: ${(totalmem() / 1024 / 1024 / 1024).toFixed(4)} GB
Memoria libre: ${(freemem() /1024 / 1024 / 1024).toFixed(4)} GB
Tiempo que se encuentra ejecutando el script: ${(uptime() / 60 / 60).toFixed(2)} horas
`);