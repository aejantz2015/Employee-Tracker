DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id                      INTEGER             NOT NULL  PRIMARY KEY AUTO_INCREMENT,
    department_name         VARCHAR(255)        NOT NULL
);

CREATE TABLE roles (
    id          INTEGER         NOT NULL     PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255)    NOT NULL,
    salary      DECIMAL         NOT NULL,
    department_id       INTEGER,

    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id              INTEGER             NOT NULL   PRIMARY KEY AUTO_INCREMENT,
    first_name      VARCHAR(255)        NOT NULL,
    last_name       VARCHAR(255)        NOT NULL,
    role_id         INTEGER,
    salary          DECIMAL             NOT NULL,
    manager_id      INTEGER,

    FOREIGN KEY (role_id) 
    REFERENCES roles(id) 
    ON DELETE SET NULL,

    FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
    ON DELETE SET NULL 
    );