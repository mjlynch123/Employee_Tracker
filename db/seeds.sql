-- Insert departments
INSERT INTO departments (department_name) VALUES ('Management');
INSERT INTO departments (department_name) VALUES ('Development');
INSERT INTO departments (department_name) VALUES ('Sales');
INSERT INTO departments (department_name) VALUES ('Human Resources');
INSERT INTO departments (department_name) VALUES ('Marketing');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES ('Manager', 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Developer', 80000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 60000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('HR Specialist', 70000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Coordinator', 50000, 5);

-- Insert employees
-- Employee 1
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('John', 'Doe', 1, 'Management', 100000, NULL);

-- Employee 2
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Jane', 'Smith', 2, 'Development', 80000, 'John Doe');

-- Employee 3
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Tom', 'Johnson', 3, 'Sales', 60000, 'John Doe');

-- Employee 4
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Sarah', 'Williams', 4, 'Human Resources', 70000, 'Jane Smith');

-- Employee 5
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Michael', 'Brown', 5, 'Marketing', 50000, 'Jane Smith');

-- Employee 6
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Emily', 'Jones', 1, 'Management', 100000, 'John Doe');

-- Employee 7
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('David', 'Lee', 2, 'Development', 80000, 'Emily Jones');

-- Employee 8
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Amy', 'Chen', 3, 'Sales', 60000, 'Emily Jones');

-- Employee 9
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Daniel', 'Nguyen', 4, 'Human Resources', 70000, 'Sarah Williams');

-- Employee 10
INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) 
VALUES ('Sophia', 'Kim', 5, 'Marketing', 50000, 'Michael Brown');
