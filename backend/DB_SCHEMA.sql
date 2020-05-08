CREATE TABLE `product_types` (
  `product_type_id` int PRIMARY KEY AUTO_INCREMENT,
  `dept_id` int,
  `price` int,
  `product_type_name` varchar(255)
);

CREATE TABLE `departments` (
  `dept_id` int PRIMARY KEY AUTO_INCREMENT,
  `dept_name` varchar(255),
  `dept_mngr` int
);

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('base_user', 'admin'),
  `dept_id` int,
  `email` varchar(255),
  `password` varchar(255),
  `first` varchar(255),
  `last` varchar(255)
);

CREATE TABLE `orders` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `order_date` date
);

CREATE TABLE `sales` (
  `sale_id` int PRIMARY KEY AUTO_INCREMENT,
  `sale_date` date
);

CREATE TABLE `products` (
  `product_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_type_id` int,
  `order_id` int,
  `sale_id` int,
  `exp_date` date,
  `location` ENUM ('back', 'shelf')
);

ALTER TABLE `product_types` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

ALTER TABLE `departments` ADD FOREIGN KEY (`dept_mngr`) REFERENCES `users` (`user_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`product_type_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
