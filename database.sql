CREATE DATABASE test;
USE test;
CREATE TABLE `contacts` (
  `name` varchar(45) DEFAULT NULL,
  `id` varchar(45) NOT NULL,
  `mobile_number` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
