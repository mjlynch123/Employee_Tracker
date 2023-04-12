DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name CHAR(50) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary INT NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name CHAR(50) NOT NULL,
  last_name CHAR(50) NOT NULL,
  role_id INT DEFAULT 1, -- Specify a default value for role_id column
  department CHAR(30) NOT NULL,
  salary INT NOT NULL,
  manager CHAR(50),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);