show databases;
use sakila;
show tables;
-- 21) Visualiza los 10 actores que han participado en más películas
-- (de mas a menos participaciones)
SELECT ac.actor_id, ac.first_name, ac.last_name, COUNT(fa.film_id) AS cantidad_peliculas
FROM actor ac
INNER JOIN film_actor fa ON fa.actor_id = ac.actor_id
GROUP BY ac.actor_id, ac.first_name, ac.last_name
ORDER BY cantidad_peliculas DESC
LIMIT 10;
-- 22) Visualiza los clientes de países que empiezan por S
SELECT CONCAT(cu.first_name, " ", cu.last_name) as customer_name, co.country FROM customer cu
inner join address ad
on ad.address_id = cu.address_id
inner join city ci
on ci.city_id = ad.city_id
inner join country co
on co.country_id = ci.country_id
WHERE co.country LIKE "s%";
-- 23) Visualiza el top-10 de países con más clientes
SELECT co.country, COUNT(cu.customer_id) as customers_quantity FROM customer cu
inner join address ad
on ad.address_id = cu.address_id
inner join city ci
on ci.city_id = ad.city_id
inner join country co
on co.country_id = ci.country_id
group by co.country_id, ci.country_id
order by customers_quantity DESC
LIMIT 10;
-- 24) Saca las 10 primeras películas alfabéticamente y el número de copias que se disponen de cada una de ellas
SELECT film.title, COUNT(inventory.film_id) as counter_films FROM film
inner join inventory on inventory.film_id = film.film_id
group by inventory.film_id
ORDER BY title
LIMIT 10;
SELECT * from inventory;
-- 25 ¿ Cuántas películas ha alquilado Deborah Walker?
SELECT cu.first_name, COUNT(r.customer_id) FROM customer cu inner join rental r on r.customer_id = cu.customer_id where cu.first_name LIKE "Deborah" group by r.customer_id, cu.customer_id 
-- 26) Crea un procedimiento almacenado llamado 'rentals_by_client'
-- el cual, a partir del nombre y apellido del cliente,
-- muestre : nombre del cliente, apellido del cliente, título de la película, fecha de alquiler
-- ordenado por fecha de alquiler descendente
-- Pruébalo con el cliente 'Deborah Walker'



-- 27) Crea un procedimiento almacenado llamado 'client_rental' que, realizando el alquiler de
-- una pelicula por parte de un cliente, nos retorne cuantos alquileres ha hecho.
-- la fecha del alquiler es la actual
-- Pruébalo así : call client_rental('Deborah', 'Walker', "ALADDIN CALENDAR" )