DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(5) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Green Bandana", "Accessories", 7.99, 30),
(2, "Black Bandana", "Accessories", 7.99, 30),
(3, "Clack Fan", "Accessories", 12.99, 25),
(4, "Mandala Shawl", "Outerwear", 59.99, 20),
(5, "Chakra Shawl", "Outerwear", 59.99, 20),
(6, "Long Fur Coat", "Outerwear", 119.99, 15),
(7, "Zebra Joggers", "Bottoms", 49.99, 25),
(8, "Gold Joggers", "Bottoms", 59.99, 25),
(9, "Silver Joggers", "Bottoms", 49.99, 25),
(10, "LED Shoes", "Footwear", 89.99, 10)
