-- EVALUACION PRACTICA

-- ALUMNO : (pon aquí tu nombre)
-- FECHA : 15-04-2024

/*
Los ejercicios se organizan en tres bloques, segun su dificultad.
Hay por tanto tres niveles de puntuacion: 0.50, 1.00 y 1.50 puntos.
La resolucion de cada ejercicio se valora siguiendo este criterio:

* Ejercicio perfectamente resuelto o con algun error no relevante: 100%.
* Ejercicio bien planteado pero no resuelto, con algun error importante 
o varios errores leves, pero que no afecten a la comprension global del tema: 50%.
* Ejercicio no resuelto o con errores graves, que muestren falta de comprension
del tema : 0%.

Por tanto:

* un ejercicio bien resuelto del bloque 1 valdra : 0.50 x 100% = 0.50 puntos
* un ejercicio con algun error importante del bloque 2 valdra : 1.00 x 50% = 0.50 puntos

NOTA IMPORTANTE #1: No debes 'hardcodear' los ids, es decir, introducirlos a mano después de mirar las tablas. 
Si los necesitas, han de ser el resultado de alguna consulta.

NOTA IMPORTANTE #2 : Debe entregarse solo este fichero sin la base de datos y sin comprimir,
de este modo :  UF_1845_AP_Tu_Nombre.sql

*/
show databases;
use cine;
select * from profesion;
select * from people;
SELECT * FROM genero;

/*
EJERCICIO #1 : 0.50 puntos
Muestra solo las actrices.
Ha de aparecer apellido, nombre, fecha_nacimiento
Ordenadas por apellido y nombre, descendente 
*/

select apellido, nombre, fecha_nacimiento from people pe
inner join profesion pr
on pe.profesion = pr.id_profesion
inner join genero ge 
on pe.genero = ge.id_genero
where pr.profesion = "actuacion" AND ge.genero = "mujer"
order by pe.apellido DESC, pe.nombre DESC;

/*
EJERCICIO #2 : 0.50 puntos
Muestra solo los personajes nacidos en el siglo XIX.
Debe aparecer : nombre y apellido juntos como 'personajes nacidos en el siglo XIX'
ordenados por profesión y nombre ascendente.
*/
SELECT concat(nombre, " ", apellido) as "personajes nacidos en el siglo XIX" from people
inner join profesion on profesion.id_profesion = people.profesion
WHERE fecha_nacimiento LIKE "19__"
order by profesion.profesion ASC, people.nombre ASC;
/*
EJERCICIO #3 : 0.50 puntos
Muestro solo la información del personaje dedicado a la música con la 
fecha de nacimiento más reciente. Todos los datos, excepto el id.
*/
SELECT nombre, apellido, ge.genero, oscars, fecha_nacimiento, profesion.profesion FROM people
inner join profesion on profesion.id_profesion = people.profesion
inner join genero ge 
on people.genero = ge.id_genero
where profesion.profesion = "musica"
order by people.fecha_nacimiento DESC
LIMIT 1;
/*
EJERCICIO #4 : 0.50 puntos
Personas dedicadas a la interpretación (de cualquier género) que únicamente han ganado un Óscar.
Ha de aparecer el nombre y el apellido combinados como 'actores que solo han ganado un oscar' y el género
Ordenados por apellido en forma ascendente.
*/
select concat(nombre, " ", apellido) as "actores que solo han ganado un oscar", ge.genero from people pe
inner join profesion pr
on pe.profesion = pr.id_profesion
inner join genero ge 
on pe.genero = ge.id_genero
where pr.profesion = "actuacion" AND oscars = 1
order by apellido ASC;
/*
EJERCICIO #5 : 0.50 puntos
Muestra cuántos personajes no han ganado nunca un Óscar. Debe aparecer solo la cantidad.
*/
SELECT COUNT(*) as "cantidad personajes sin Oscar" from people
WHERE oscars = 0;
/*
EJERCICIO #6 : 0.50 puntos
Borra de la lista el personaje:  "Arthur Rubinstein"

DELETE from people where id = 19;
*/
DELETE from people where nombre = "Arthur" AND apellido = "Rubinstein";



/*
EJERCICIO #7 : 0.50 puntos
La fecha de nacimiento de "John Williams" está mal, ya que debe ser 1932. Cámbiala.
*/
UPDATE people set fecha_nacimiento = "1932"  
WHERE nombre = "John" AND apellido = "Williams";

/*
EJERCICIO #8 : 1.00 puntos
Muestra que director que no ha ganado ningún Óscar es el que tiene la fecha de nacimiento más antigua.
Debe aparecer el nombre completo del director y su profesión
*/
select concat(nombre, " ", apellido) as "nombre completo", pr.profesion from people pe
inner join profesion pr
on pe.profesion = pr.id_profesion
where oscars = 0 AND pr.profesion = "direccion"
order by fecha_nacimiento ASC
LIMIT 1;

/*
EJERCICIO #9 : 1.00 puntos
Muestra sólo las personas dedicadas a la interpretación de género masculino nacidas entre 1920 y 1940
Ha de aparecer : nombre, apellido, profesión y la fecha de nacimiento como 'nacimiento'
Ordenado por la fecha de nacimiento en forma descendente.
*/
select nombre, apellido, pr.profesion , fecha_nacimiento as "nacimiento", ge.genero from people pe
inner join profesion pr
on pe.profesion = pr.id_profesion
inner join genero ge 
on pe.genero = ge.id_genero
where ge.genero = "hombre"and pr.profesion = "actuacion" and fecha_nacimiento between 1920 and 1940;
/*
EJERCICIO #10 : 1.00 puntos
Muestra los personajes que han ganado más Óscars, pero sólo los que están en primera posición.
Debe aparecer nombre, apellido y profesión
Ordenados por apellido descendente
*/
SELECT nombre, apellido, pr.profesion, oscars from people pe
inner join profesion pr
on pe.profesion = pr.id_profesion
WHERE pe.oscars = (
    SELECT MAX(oscars)
    FROM people
)
order by apellido DESC;

/*
EJERCICIO #11 : 1.50 puntos
¿Cuántos personajes hay de cada género?
La respuesta debe ser : 'Hay X mujeres, Y hombres y Z otros' como 'Genero de los personajes'
*/
SELECT 
    CONCAT('Hay ',
           SUM(CASE WHEN ge.genero = 'Mujer' THEN 1 ELSE 0 END),
           ' mujeres, ',
           SUM(CASE WHEN ge.genero = 'Hombre' THEN 1 ELSE 0 END),
           ' hombres y ',
           SUM(CASE WHEN ge.genero NOT IN ('Mujer', 'Hombre') THEN 1 ELSE 0 END),
           ' otros') AS 'Genero de los personajes'
FROM people pe
inner join genero ge 
on pe.genero = ge.id_genero;
/*
EJERCICIO #12 : 1.50 puntos
Crea un procedimiento almacenado para añadir personajes a la base de datos.
Se llamará st_poblar_bd 
Los parámetros serán : nombre, apellido, profesion, genero, oscars y fecha de nacimiento

Pruébalo con estos ejemplos:
st_poblar_bd('Groucho', 'Marx', 'interpretacion', 'hombre', 1, 1980);
st_poblar_bd('Howard', 'Shore', 'musica', 'hombre', 1, 1946);
*/
DELIMITER //

CREATE PROCEDURE st_poblar_bd(
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(30),
    IN p_profesion VARCHAR(25),
    IN p_genero VARCHAR(10),
    IN p_oscars INT,
    IN p_fecha_nacimiento VARCHAR(25)
)
BEGIN
    DECLARE profesion_id INT;
    DECLARE genero_id INT;

    CASE p_profesion
        WHEN 'direccion' THEN SET profesion_id = 1;
        WHEN 'actuacion' THEN SET profesion_id = 2;
        ELSE SET profesion_id = 3;  
    END CASE;
    CASE p_genero
		WHEN "mujer" THEN SET genero_id = 1;
        WHEN "hombre" THEN SET genero_id = 2;
        ELSE SET profesion_id = 3;
	END CASE;

    -- Insertar el nuevo registro en la tabla people
    INSERT INTO people (nombre, apellido, profesion, genero, oscars, fecha_nacimiento)
    VALUES (p_nombre, p_apellido, profesion_id, genero_id, p_oscars, p_fecha_nacimiento);
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS st_poblar_bd;

CALL st_poblar_bd('Groucho', 'Marx', 'interpretacion', 'hombre', 1, 1980);
/*
REALIZAR CORRECTAMENTE LA ENTREGA DE LOS EJERCICIOS
SEGÚN LAS INSTRUCCIONES INDICADAS : 0.50 puntos
*/








