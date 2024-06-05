-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2024 a las 08:40:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cars`
--
CREATE DATABASE IF NOT EXISTS `cars` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cars`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

CREATE TABLE IF NOT EXISTS `alquileres` (
  `id_alquiler` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_modelo` int(11) NOT NULL,
  `fecha_recogida` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `facturacion` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_alquiler`),
  KEY `id_vehiculo_index` (`id_modelo`),
  KEY `id_cliente_index` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`id_alquiler`, `id_cliente`, `id_modelo`, `fecha_recogida`, `fecha_entrega`, `facturacion`) VALUES
(1, 1, 1, '2024-03-12', '2024-03-15', 196),
(2, 1, 2, '2024-03-01', '2024-03-25', 1378),
(3, 1, 3, '2024-03-05', '2024-03-15', 2992),
(4, 1, 2, '2024-03-01', '2024-03-30', 1590);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `tel` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `poblacio` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `dni`, `tel`, `email`, `poblacio`, `password`) VALUES
(1, 'Luciano', 'Pavarotti', '123456789', '123456789', 'luciano@pavarotti.it', 'Modena', 'Luciano'),
(2, 'Maria', 'Callas', '456789123', '456789123', 'maria@callas.us', 'Paris', 'Maria'),
(3, 'Josep', 'Carreras', '789456123', '789456123', 'josep@carreras.cat', 'Barcelona', 'Josep'),
(4, 'Montserrat', 'Caballé', '321654987', '321654987', 'montserrat@caballe.cat', 'Barcelona', 'Montserrat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos`
--

CREATE TABLE IF NOT EXISTS `modelos` (
  `id_modelo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modelo` varchar(50) NOT NULL,
  `unidades_totales` int(2) NOT NULL,
  `unidades_alquiladas` int(2) NOT NULL,
  `personas` int(2) NOT NULL,
  `puertas` int(1) NOT NULL,
  `cambio` varchar(20) NOT NULL,
  `maletas` int(1) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `precioDia` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_modelo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelos`
--

INSERT INTO `modelos` (`id_modelo`, `nombre_modelo`, `unidades_totales`, `unidades_alquiladas`, `personas`, `puertas`, `cambio`, `maletas`, `tipo`, `precioDia`) VALUES
(1, 'Fiat Panda', 5, 0, 4, 5, 'manual', 2, 'coche', 49),
(2, 'Nissan Micra', 4, 0, 4, 5, 'manual', 2, 'coche', 53),
(3, 'Nissan X-trail Auto', 1, 0, 5, 5, 'manual', 2, 'coche', 187),
(4, 'Fiat 500 Cabrio', 3, 2, 4, 3, 'manual', 2, 'coche', 77),
(5, 'Jeep Wrangler', 5, 2, 4, 3, 'manual', 2, 'coche', 104),
(6, 'Opel ZafiraSG', 7, 5, 4, 3, 'manual', 4, 'coche', 106),
(7, 'Piaggio Vespa 125 LX', 2, 0, 2, 0, 'manual', 0, 'moto', 29),
(8, 'Opel Corsa', 5, 5, 4, 3, 'manual', 3, 'coche', 57),
(9, 'Piaggio Beverly 300cc', 2, 0, 2, 0, 'manual', 0, 'moto', 45),
(10, 'Nissan Primastar', 5, 2, 9, 5, 'manual', 5, 'furgoneta', 147);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD CONSTRAINT `alquileres_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `alquileres_ibfk_2` FOREIGN KEY (`id_modelo`) REFERENCES `modelos` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
