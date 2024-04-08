-- Utiliza la base de datos sakila, disponible en MySQL Workbench,
-- para resolver estos ejercicios 
show databases;
use sakila;
show tables;
-- 1) Actores que tienen el primer nombre "Gary"
SELECT * FROM actor
WHERE first_name = "Gary";
-- 2) Actores que tiene de primer apellido "Streep"
SELECT * FROM actor
WHERE last_name = "Streep";
-- 3) Actores que contengan una "o" en su nombre
SELECT * FROM actor WHERE first_name LIKE "%o%";
-- 4) Actores que contengan una "a" en su nombre y una "e" en su apellido
SELECT * FROM actor WHERE first_name LIKE "%a%" AND last_name LIKE "%e%";
-- 5) Actores que contengan dos "o" en su nombre (en cualquier posicion) y una "a" en su apellido
SELECT * FROM actor WHERE first_name LIKE "%o%o%" AND last_name LIKE "%a%";
-- 6) Actores cuya tercera letra del nombre sea "b"
SELECT * FROM actor WHERE first_name LIKE "__b";
show tables;
-- 7) Ciudades que empiezan por "a"
SELECT * FROM city WHERE city LIKE "a%";
-- 8) Ciudades que acaban por "s"
SELECT * FROM city WHERE city LIKE "%s";
-- 9) Ciudades del country "France"
SELECT * from country;
SELECT * FROM city
inner join country
on city.country_id = country.country_id
WHERE country.country = "France";
-- 10) Ciudades con nombres compuestos (como New York)
SELECT * FROM city
INNER JOIN country ON city.country_id = country.country_id
WHERE country.country LIKE '% %';
-- 11) películas con una duración entre 80 y 100 m.
SELECT * FROM film WHERE length > 80 AND length < 100;
-- 12) películas con un rental_rate entre 1 y 3
SELECT * FROM film WHERE rental_rate > 1 AND rental_rate < 3;
-- 13) películas con un título de más de 11 letras.
SELECT * FROM film WHERE LENGTH(title) > 11;
-- 14) películas con un rating de PG o G.
SELECT * FROM film WHERE rating = "PG" OR rating = "G";
-- 15) ¿Cuantas ciudades tiene el country ‘France’? 
SELECT COUNT(city) FROM city
inner join country
on city.country_id = country.country_id
WHERE country.country = "France";
-- 16) Películas que no tengan un rating de NC-17
SELECT * FROM film WHERE rating != "NC-17";
-- 17) Películas con un rating PG y duración de más de 120.
SELECT * FROM film WHERE rating = "PG" AND length > 120;
-- 18) ¿Cuantos actores hay?
show tables;
SELECT * from actor;
SELECT COUNT(first_name) FROM actor;
-- 19) Película con mayor duración.
SELECT * FROM film
order by length DESC
LIMIT 1;
-- 20) ¿Cuantos clientes viven en Indonesia?
SELECT COUNT(*) as Clientes_indonesia FROM customer_list 
WHERE country = "Indonesia";
