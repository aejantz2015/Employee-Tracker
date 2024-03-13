CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT
    name VARCHAR(255) NOT NULL
);

CREATE TABLE position (
    id INTEGER PRIMARY KEY AUTO_INCREMENT
    title VARCHAR(255) NOT NULL
    salary DECIMAL NOT NULL
    department_id INTEGER
    IDEX dep_ind (department_id)
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
)

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT
    first_name VARCHAR(255) NOT NULL
    last_name VARCHAR(255) NOT NULL
    position_id INTEGER
    INDEX position_ind (position_id)
    CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES position(id) ON DELETE SET NULL
    manager_id INTEGER
    INDEX manager_ind (manager_id)
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
)