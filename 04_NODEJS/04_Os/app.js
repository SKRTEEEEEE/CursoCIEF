const os = require("node:os");

const reloj = (value) => {
    const segundosTotales = Math.floor(value); // Redondear el tiempo de actividad a segundos totales

    const horas = Math.floor(segundosTotales / 3600); // Calcular las horas
    const minutos = Math.floor((segundosTotales % 3600) / 60); // Calcular los minutos
    const segundos = segundosTotales % 60; // Calcular los segundos

    return `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
};

const tiempoDeActividad = os.uptime(); // Obtener el tiempo de actividad del sistema en segundos

console.log( reloj(3600));

console.log(`Tiempo de actividad del sistema: ${reloj(tiempoDeActividad)}`);

console.log(
`Info del sistema operativo:  ${os.type()}
Usuario activo: ${os.userInfo().username}
Directorio principal: ${os.homedir()}
Tipo de sistema: ${os.platform()}
Architecture: ${os.arch()}
CPUs: ${os.cpus().length}
Memoria total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(4)} GB
Memoria libre: ${(os.freemem() /1024 / 1024 / 1024).toFixed(4)} GB
Tiempo que se encuentra ejecutando el script: ${(os.uptime() / 60 / 60).toFixed(2)} horas
`);