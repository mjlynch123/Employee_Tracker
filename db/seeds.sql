-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Developer', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 60000, 2);

-- Insert employees
INSERT INTO 
employees (first_name, last_name, role_id, department, salary, manager) 
VALUES 
('John',
 'Doe', 
 1, 
 'Management', 
 100000, 
 NULL);

INSERT INTO 
employees (first_name, last_name, role_id, department, salary, manager) 
VALUES 
('Jane', 
'Smith', 
2, 
'Development', 
80000, 
'John Doe');

INSERT INTO 
employees (first_name, last_name, role_id, department, salary, manager) 
VALUES 
('Tom', 
'Johnson', 
3, 
'Sales', 
60000, 
'John Doe');
