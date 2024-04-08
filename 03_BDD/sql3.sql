use tienda_moviles;
-- no funciona porque no tengo fa.id_cliente
-- la vista se vera como una tabla
CREATE VIEW clientes_apple_vw as

SELECT * FROM clientes cl 
INNER JOIN facturas fa
ON cl.id_cliente = fa.id_cliente
INNER JOIN productos pr
ON fa.id_producto = pr.id_producto
INNER JOIN familia_producto fp
ON pr.id_familia_producto = fp.id_familia_producto;

-- no funciona pq no hay fa.id_producto
-- curdate() nos devuelve la fecha de hoy
-- replace cambia VIEW existente

CREATE OR REPLACE VIEW clientes_apple_vw as
SELECT cl.nombre_cliente, cl.apellido_cliente, fa.fecha FROM clientes cl 
INNER JOIN facturas fa
ON cl.id_cliente = fa.id_cliente AND fa.fecha > curdate() - interval 10 day
INNER JOIN productos pr
ON fa.id_producto = pr.id_producto
INNER JOIN familia_producto fp
ON pr.id_familia_producto = fp.id_familia_producto;


SELECT * FROM clientes_apple_vw;
drop view clientes_apple_vw;
-- drop view clientes_apple_vw; -> eliminamos la vista (VIEW)  

-- VARIABLES
set @ahora = now();
SELECT @ahora;
SELECT DATE(@ahora);
SELECT TIME(@ahora);
-- year(), month(), week(), day(), hour(), minute(), second()
SELECT dayofweek(@ahora), dayofmonth(@ahora), dayofyear(@ahora), dayname(@ahora);

