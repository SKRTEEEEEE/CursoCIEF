# El leguaje de Docker es YAML
# ============================
# Descargar la imagen que queremos utilizar
# FROM node -> La utlima
FROM node:22
# Poner "información?"
LABEL developer = "Adan Reh"
# Establecemos la carpeta de trabajo en la imagen
WORKDIR /app
# Copiamos el packaje.json y ..-lock.. con la informacion de las dependencias
# COPY packaje.json
# COPY packaje-lock.json
COPY package*.json ./
# Run: ejecutamos algo(en este caso: la instalación de los modulos)
RUN npm install
# Copiamos todos los archivos excepto lo que indiquemos en el .dockerignore
COPY . .
# Para que arranque la aplicacion (el contenodor) 

CMD ["npm", "start"]


# ---
    # Para construir el contenedor hemos de tirar el comando:
    # docker build -t node-game .
    # Para ver las imagenes en la maquina
    # docker images
    # Para levantar el contenador
    # -d lo levanta y lo ejecuta como servicio como si fuera MySQL o cualquier otro
    # <puente-entre-puertos> El que usamos en la maquina:El que se usa en la imagen(ESTE HA DE SER EL MISMO)
    # <nombre-del-proyecto>
    # docker run -d -p 4000:2500 node-game