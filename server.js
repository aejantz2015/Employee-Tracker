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
                  'View employees by the departments',
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
    const sql = `SELECT id, department_name AS department FROM department`

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
    const sql = `SELECT id, title, salary, department_id AS department FROM roles`

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
    const sql = `SELECT id, first_name, last_name, role_id, salary, manager_id FROM employee`

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
            message: 'Who is the employees manager?',
            name: 'manager_id'
        },
        {
            type: 'input',
            message: 'What is the employees salary',
            name: 'salary'
        },
    ])
    let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id, salary) VALUES (?, ?, ?, ?)`
    let params = [res.first_name, res.last_name, res.postion_id, res.managr_id];
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
        const updateEmployee = await inquirer.promot ([
            {
                type: 'list',
                message: 'Please select the employee you would like to update',
                choices: employee.map((e) => ({name: `${e.first_name} ${e.last_name}`, value: e.id})),
                name: 'postion_id'
            }
        ])
    })
}

menu()