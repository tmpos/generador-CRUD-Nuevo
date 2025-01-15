CREATE TABLE IF NOT EXISTS `menu_aplicacion` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `label` TEXT(250) NOT NULL,
  `orden` TEXT(250) NOT NULL,
  `icon` TEXT(250) NOT NULL,
  `tipo` TEXT(250) NOT NULL,
  `parent` TEXT(250) NOT NULL,
  `link` TEXT(250) NOT NULL,
  `permiso` TEXT(250) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `usuario` text(250) COLLATE utf8_spanish_ci NOT NULL
);