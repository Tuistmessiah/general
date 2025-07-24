-- 1. Create database
CREATE DATABASE pet_shop;

-- 2. Use database
USE pet_shop;

-- 3. Create cats table
CREATE TABLE cats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  breed VARCHAR(50) DEFAULT 'Domestic Shorthair',
  evilness INT DEFAULT 5 CHECK (evilness BETWEEN 1 AND 10)
);

-- 4. Insert funny cat data
INSERT INTO cats (name, breed, evilness) VALUES
  ('Mr. Whiskers', 'Sphynx', 8),
  ('Chairman Meow', 'Siamese', 10),
  ('Fluffy', NULL, 3);