const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Aej.178721',
        database: 'employee_db'
    }
);

function menu() {
    inquirer.prompt ({
        type: 'list',
        name: 'action',
        message: 'Please choose from the following',
        choices: ['View all departments',
                  'View all roles',
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employees role'],
    })
    .then(res => {

        if (res.action === 'View all departments') {
            showDepartments()
        };
        if (res.action === 'View all roles') {
            showRoles()
        };
        if (res.action === 'View all employees') {
            showEmployees()
        };
        if (res.action === 'Add a department') {
            addDepartment()
        };
        if (res.action === 'Add a role') {
            addPostion()
        };
        if (res.action === 'Add an employee') {
            addEmployee()
        };
        if (res.action === 'Update an employees role') {
            updateEmployee()
        };
    });
}
// function to view departments
function showDepartments() {
    console.log('Showing all departments...\n')
    const sql = `SELECT id, department_name AS Department FROM department`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        };
        console.table(rows)
        menu();
    })
};

// function to view roles
function showRoles() {
    console.log('Showing all postions...\n')
    const sql = `SELECT id, Title, Salary, department_id AS Department FROM roles`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        };
        console.table(rows)
        menu();
    })
};

// function to view all employees
function showEmployees() {
    console.log('Showing all employees...\n')
    const sql = `SELECT e.id, e.first_name AS First, e.last_name AS Last, r.title AS Title, d.department_name AS Department, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
    FROM employee e
    JOIN roles r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        };
        console.table(rows)
        menu();
    })
};

async function addDepartment() {
    const res = await inquirer.prompt([ 
        {
        type: 'input',
        message: 'What is the new department?',
        name: 'newDepartment'
        }
    ])
    let sql = `INSERT INTO department (department_name) VALUES (?)`
    let params = [res.newDepartment];

    db.query(sql, params, (err,rows) => {
        if (err) {
            console.long(err)
            return;
        };
        console.log('Department added')
        menu();
    })
};

async function addPostion() {
    const res = await inquirer.prompt([ 
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department id for this role?',
            name: 'department_id'
        }
    ])
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
    let params = [res.title, res.salary, res.department_id];

    db.query(sql, params, (err,rows) => {
        if (err) {
            console.long(err)
            return;
        };
        console.log('Postion added')
        menu();
    })
};

async function addEmployee() {
    const res = await inquirer.prompt([ 
        {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'What is their role id?',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'What is the salary for this employee',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Who is the employees manager?',
            name: 'manager_id'
        }
    ])
    let sql = `INSERT INTO employee (first_name, last_name, role_id, salary, manager_id) VALUES (?, ?, ?, ?, ?)`
    let params = [res.first_name, res.last_name, res.role_id, res.salary, res.manager_id];
    console.log(params)

    db.query(sql, params, (err,rows) => {
        if (err) {
            console.log(err)
            return;
        };
        console.log('New employee has been added')
        menu();
    })
};

async function updateEmployee() {
    db.query('SELECT * FROM employee', async (err, employee) => {
        if (err) {
            console.log(err)
            return;
        };
        const updatedEmployee = await inquirer.prompt ([
            {
                type: 'list',
                message: 'Please select the employee you would like to update',
                choices: employee.map((e) => ({name: `${e.first_name} ${e.last_name}`, value: e.id})),
                name: 'employee_id'
            }
        ]);

        db.query('SELECT * FROM roles', async (err, roles) => { 
            if (err) {
            console.log(err)
            return;
        }
        const updateRole = await inquirer.prompt ([
            {
                type: 'list',
                message: 'Please select a new role for this employee',
                choices: roles.map((r) => ({name: r.title, value: r.id})),
                name: 'role_id'
            }
        ]);
        db.query('UPDATE employee SET role_id = ? WHERE id = ?',
        [updateRole.role_id, updatedEmployee.employee_id], 
        (err, result) => { 
        if (err) {
            console.log(err)
            return;
        }
        console.log('Employee log updated!')
        menu();
        });
    });
});

}

menu()