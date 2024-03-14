const inquirer = require('inquirer')
const mysql = require('mysql2')

const promptUser = () => {
    inquirer.prompt ([
        {
        type: 'list',
        name: 'choices',
        message: 'Please choose from the following',
        choices: ['View all departments',
                  'View all roles',
                  'View all employees',
                  'View employees by the departments',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee manager',
                  'Update an employees role',
                  'Delete a role',
                  'Delete an employee',
                  'Delete a department']
        }
    ])
    .then((answers) => {
        const { choices } = answers

        if (choices === 'View all departments') {
            showDepartments()
        }
        if (choices === 'View all roles') {
            showRoles()
        }
        if (choices === 'View all employees') {
            showEmployees()
        }
        if (choices === 'View employees by the departments') {
            employeeDepartment()
        }
        if (choices === 'Add a department') {
            addDepartment()
        }
        if (choices === 'Add a role') {
            addRole()
        }
        if (choices === 'Add an employee') {
            addEmployee()
        }
        if (choices === 'Update an employee manager') {
            updateManager()
        }
        if (choices === 'Update an employees role') {
            updateEmployee()
        }
        if (choices === 'Delete a role') {
            deleteRole()
        }
        if (choices === 'Delete an employee') {
            deleteEmployee()
        }
    })
}

