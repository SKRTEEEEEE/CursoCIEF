show databases;
use skrt_universidad;
-- 1
SELECT * FROM profesor ORDER BY nombre ASC;
-- 2. Lista de alumnos ordenados por ciudad y por apellido, alfabéticamente.
SELECT * FROM persona order by ciudad ASC, apellido1 ASC;
-- 3. Lista de alumnos solo de Barcelona, alfabéticamente en sentido descendente.
SELECT * FROM persona WHERE ciudad = "Barcelona" order by apellido1 asc;
-- 4. Lista de alumnos no matriculados en ninguna asignatura: nif, nombre, apellido
SELECT nif, concat(nombre, " ", apellido1) as nombre FROM persona pe 
inner join alumno_se_matricula_asignatura am on pe.id = am.id_alumno;
-- 5. Alumno hombre más joven matriculado en 2017: nombre, apellido1 (atención, que hay personas no matriculadas)
SELECT * FROM persona pe
inner join alumno_se_matricula_asignatura am on pe.id = am.id_alumno
inner join curso_escolar ce on am.id_curso_escolar = ce.id
WHERE anyo_inicio = 2017;
-- 5. b
SELECT nombre, apellido1, sexo, anyo_inicio, fecha_nacimiento
from persona pe
inner join alumno_se_matricula_asignatura am  on pe.id = am.id_alumno
inner join curso_escolar ce on am.id_curso_escolar = ce.id
where anyo_inicio = 2017
and sexo = "M"
order by pe.fecha_nacimiento desc
limit 1;
-- 6. Profesor de más edad que dio cursos en 2019
SELECT * from profesor pr
inner join asignatura asg on pr.id_profesor = asg.id_profesor
inner join curso_escolar ce on  asg.curso = ce.id
WHERE ce.anyo_fin = 2019;
-- no hay ningun porfesor que dio cursos en el 2019
-- 7. Asignatura con más alumnos por año

SELECT * FROM personas pr
inner join asignatura asg on pr.
-- 8. Asignatura con más alumnos mujeres y cuantas son

-- 9. Asignatura con menos alumnos hombres en 2018

-- 10. Añade el alumno “John Wayne”, de Texas, sexo ‘O’, nif 98765432Z, nacido el 1 de febrero de 1999, y matricúlalo en las dos asignaturas de Javascript 


-- no existe relacion entre alumnos (persona) y asignatura

-- 11. Por un error, los alumnos de Sabadell se quedaron sin que constara su población. Debes incorporarla a la tabla.












SELECT * FROM asignatura


