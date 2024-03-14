USE employee_db

INSERT INTO department (name)
VALUES
('Sales'),
('Finance'),
('Engineering'),
('Legal');

INSERT INTO position (title, department_id, salary)
VALUES
('Sales Lead', 1 100000),
('Salesperson', 1, 80000),
('Account Manager', 2, 150000),
('Accountant', 2, 100000),
('Lead Engineer', 3, 150000),
('Software Engineer', 3, 120000),
('Lawyer', 4, 200000),
('Paralegal', 4, 100000);

INSERT INTO employee (first_name, last_name, position_id, salary)
VALUES
('Jane', 'Doe', 1, 150000),
('Jimmy', 'Fly', 1, 100000),
('George', 'Washington', 1, 150000),
('Harry', 'Potter', 1, 200000);

INSERT INTO employee (first_name, last_name, position_id, salary, manager_id)
VALUES
('Lucy', 'Bach', 6, 120000, 1),
('Jake', 'Peratla', 2, 80000, 2),
('John', 'Adams', 4, 100000, 3),
('Ron', 'Weasley', 8, 100000, 4);