-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2024 a las 12:47:42
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
-- Base de datos: `uf1846`
--
CREATE DATABASE IF NOT EXISTS `uf1846` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `uf1846`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Información de nuestro equipo profesional';

--
-- Volcado de datos para la tabla `team`
--

INSERT INTO `team` (`id`, `nombre`, `apellido`, `email`, `foto`, `departamento`) VALUES
(1, 'John', 'Bezos', 'john.bezos@pear.com', 'john.bezos.png', 'Desarrollo'),
(2, 'Bill', 'Jobs', 'bill.jobs@pear.com', 'bill.jobs.png', 'Clientes'),
(3, 'Steve', 'Windows', 'steve.windows@pear.com', 'steve.windows.png', 'Ventas'),
(4, 'Barbara', 'Kingsolver', 'barbara.kingsolver@pear.com', 'barbara.kingsolver.png', 'Desarrollo'),
(5, 'Maria', 'Blanchard', 'maria.blanchard@pear.com', 'maria.blanchard.png', 'Ventas'),
(6, 'Violetta', 'Valery', 'violetta.valeryd@pear.com', 'violetta.valery.png', 'Ventas'),
(7, 'Pat', 'Ata', 'pat.ata@whiterabbit.com', 'pat.ata.png', 'CEO'),
(8, 'Elena', 'Nito', 'elena.nito@whiterabbit.com', 'elena.nito.png', 'Clientes');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
