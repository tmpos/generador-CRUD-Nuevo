CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `name` TEXT(250) NOT NULL,
  `legal` TEXT(250) NOT NULL,
  `phone` TEXT(250) NOT NULL,
  `email` TEXT(250) NOT NULL,
  `address` TEXT(250) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `imagen` text(250) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` text(250) COLLATE utf8_spanish_ci NOT NULL
);