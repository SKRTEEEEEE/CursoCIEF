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


select dayname(fecha), count(id_factura) from facturas group by dayname(fecha) order by count(id_factura) desc;

-- VARIABLES
set @ahora = now();
-- FUNCIONES DEL SISTEMA
-- Funciones de fecha
SELECT @ahora;
SELECT DATE(@ahora);
SELECT TIME(@ahora);
-- year(), month(), week(), day(), hour(), minute(), second()
SELECT dayofweek(@ahora), dayofmonth(@ahora), dayofyear(@ahora), dayname(@ahora);
-- Funciones de texto
SELECT CONCAT("Buenos", " ", "días") as saludo;
SELECT CONCAT_WS(" ", "Buenos", "Dias", "a", "todo", "kinky") as saludo;

SELECT LENGTH("Buenos") as contador;
use tienda_moviles;
-- trim quita los espacios
SELECT nombre_cliente FROM CLIENTES WHERE length(trim(nombre_cliente)) > 4;
SELECT upper(nombre_cliente) FROM clientes;

-- STORE PROCEDURES (procedimientos) -> no devuelven un valor - para tareas repetitivas
-- permiten tres variables
-- IN -> prefijo interior? solo van a afectar al procedimiento
-- OUT -> se van a utilizar luego
-- INOUT -> ambas
-- para definir donde empieza y donde acaba la procedure
-- BEGIN
-- END
-- para cambiar el delimiter para poder marcar dentro del procedimiento(PROCEDURE) donde acaba cada sentencia con ; 
-- DELIMITER

DELIMITER $$
CREATE PROCEDURE st_ejemplo(IN id INT)
BEGIN
	SELECT * FROM clientes WHERE id_cliente = id;
END $$
DELIMITER ;

-- para utilizar el procedure:
call st_ejemplo(5);

-- NO SE PUEDEN MODIFICAR, SE HA DE BORRAR Y VOLVER A CREAR
-- borrar procedure:
drop procedure st_ejemplo;


-- catch error with IF/ELSE procedure

use tienda_moviles_2;

DELIMITER $$
-- IF NOT EXISTS -> se queja pero funciona, no lo intenta crear directamente si no lo pones no se crea pero lo intenta crear(advertencia vs error)
-- si es una advertencia, al ejecutar varias secuencias no se detiene, con el error si
CREATE PROCEDURE IF NOT EXISTS st_ejemplo_mejorado(IN id INT)
BEGIN
	set @res = (SELECT id_cliente FROM clientes WHERE id_cliente = id);
	IF @res IS NOT NULL
    THEN SELECT * FROM clientes WHERE id_cliente = id;
    ELSE 
		SELECT ("Este id de cliente no existe todabia") as mensaje;
    END IF;
END $$
DELIMITER ;

drop procedure st_ejemplo_mejorado;
call st_ejemplo_mejorado(90);

-- EJEMPLO: procedure para la acción de comprar

DELIMITER $$
CREATE PROCEDURE compra(id_cliente INT, id_producto INT, cantidad INT, fecha DATE)
BEGIN
	INSERT INTO facturas (facturas.id_cliente, facturas.id_producto, facturas.cantidad, facturas.fecha) VALUES 
    (id_cliente, id_producto, cantidad, fecha);
	
END $$
DELIMITER ;

call compra(2,7,2,DATE(NOW()));

-- EJEMPLO 2:

DELIMITER $$
CREATE PROCEDURE compra_mejorada(id INT, nombre VARCHAR(30), cantidad_compra INT)
BEGIN
	set @id_producto = (SELECT id_producto from productos WHERE nombre_producto = nombre);
	-- variable para saber que stock hay
    set @stock = ( SELECT stock from productos WHERE id_producto = @id_producto);
		IF 
			@id_producto is not null AND @stock >= cantidad_compra
		THEN 
			insert into facturas (id_cliente, id_producto, cantidad, fecha) values
            (id, @id_producto, cantidad_compra, DATE(NOW()));
            update productos set stock = stock - cantidad_compra where id_producto = @id_producto;
		ELSE
			SELECT ("Producto y/o cantidad incorrectos");
		END IF;
        SELECT concat("Quedan ", (SELECT stock FROM productos WHERE id_producto = @id_producto), " de ", 
		nombre) as respuesta;
	
END $$
DELIMITER ;

drop procedure compra_mejorada;

call compra_mejorada(2, "IPhone 14", 2);
SELECT @id_producto;

SELECT concat("Quedan", (SELECT stock FROM productos WHERE id_producto = @id_producto), "de", 
			( SELECT nombre_producto from productos WHERE id_producto = @id_producto));









