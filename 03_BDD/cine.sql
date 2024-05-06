-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 14-04-2024 a les 21:44:17
-- Versió del servidor: 10.4.19-MariaDB
-- Versió de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `cine`
--
CREATE DATABASE IF NOT EXISTS `cine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cine`;

-- --------------------------------------------------------

--
-- Estructura de la taula `genero`
--

CREATE TABLE `genero` (
  `id_genero` int(1) NOT NULL,
  `genero` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `genero`
--

INSERT INTO `genero` (`id_genero`, `genero`) VALUES
(1, 'mujer'),
(2, 'hombre'),
(3, 'otro');

-- --------------------------------------------------------

--
-- Estructura de la taula `people`
--

CREATE TABLE `people` (
  `id_people` int(2) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `profesion` int(2) NOT NULL,
  `genero` int(1) NOT NULL,
  `oscars` int(2) NOT NULL,
  `fecha_nacimiento` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Datos básicos de personas famosas del cine';

--
-- Bolcament de dades per a la taula `people`
--

INSERT INTO `people` (`id_people`, `nombre`, `apellido`, `profesion`, `genero`, `oscars`, `fecha_nacimiento`) VALUES
(1, 'Katharine', 'Hepburn', 2, 1, 4, '1907'),
(2, 'James', 'Stewart', 2, 2, 2, '1908'),
(3, 'John', 'Ford', 1, 1, 4, '1894'),
(4, 'Cary', 'Grant', 2, 2, 1, '1908'),
(5, 'Henry', 'Fonda', 2, 2, 2, '1905'),
(6, 'Billy', 'Wilder', 1, 2, 6, '1906'),
(7, 'Marilyn', 'Monroe', 2, 1, 0, '1926'),
(8, 'Shirley', 'MacLaine', 2, 1, 1, '1934'),
(9, 'Alfred', 'Hitchcock', 1, 2, 0, '1899'),
(10, 'Nino', 'Rota', 3, 2, 1, '1911'),
(11, 'John', 'Barry', 3, 2, 4, '1933'),
(12, 'Sean', 'Connery', 2, 2, 1, '1930'),
(13, 'Ingrid', 'Bergman', 2, 1, 2, '1915'),
(14, 'Audrey', 'Hepburn', 2, 1, 1, '1929'),
(15, 'Grace', 'Kelly', 2, 1, 1, '1929'),
(16, 'Rachel', 'Portman', 3, 1, 1, '1960'),
(17, 'Meryl', 'Streep', 2, 1, 3, '1949'),
(18, 'John', 'Williams', 3, 2, 6, '1823'),
(19, 'Arthur', 'Rubinstein', 3, 2, 1, '1887'),
(20, 'Jack', 'Nickolson', 2, 2, 3, '1937'),
(21, 'Paul', 'Newman', 2, 2, 1, '1925'),
(22, 'Orson', 'Welles', 1, 2, 0, '1915'),
(23, 'R2', 'D2', 2, 3, 0, '1975'),
(24, 'C3', 'PO', 1, 3, 0, '1975');

-- --------------------------------------------------------

--
-- Estructura de la taula `profesion`
--

CREATE TABLE `profesion` (
  `id_profesion` int(2) NOT NULL,
  `profesion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `profesion`
--

INSERT INTO `profesion` (`id_profesion`, `profesion`) VALUES
(1, 'direccion'),
(2, 'actuacion'),
(3, 'musica');

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id_genero`);

--
-- Índexs per a la taula `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id_people`),
  ADD KEY `fk_genero` (`genero`),
  ADD KEY `fk_profesion` (`profesion`);

--
-- Índexs per a la taula `profesion`
--
ALTER TABLE `profesion`
  ADD PRIMARY KEY (`id_profesion`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `genero`
--
ALTER TABLE `genero`
  MODIFY `id_genero` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la taula `people`
--
ALTER TABLE `people`
  MODIFY `id_people` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2525;

--
-- AUTO_INCREMENT per la taula `profesion`
--
ALTER TABLE `profesion`
  MODIFY `id_profesion` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `fk_genero` FOREIGN KEY (`genero`) REFERENCES `genero` (`id_genero`),
  ADD CONSTRAINT `fk_profesion` FOREIGN KEY (`profesion`) REFERENCES `profesion` (`id_profesion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
