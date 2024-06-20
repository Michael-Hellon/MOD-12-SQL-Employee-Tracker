const express = require("express");
const sequelize = require('./db/connection');
/*
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
*/

// Initial prompt to user utilizing command line interface.
const menuPrompts = [
  {
    type: "list",
    message: 'What would you like to do? (Use the up/down arrow keys to select, then press ENTER)',
    name: "menuQuestions",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role", 
      "Add Employee",
      "Update Employee Role",
/*  Bonus Points
      "Update Employee Manager",
      "View Employee by Manager",
      "View Employee by Department",
      "Delete Departments",
      "Delete Roles",
      "Delete Employees",
      "View Utilized Budget of a Department",
*/
      "Quit",
    ],
  }
]

// switch statement to select follow on questions and provide responses to user
function menuQuestionsResponse(menuQuestions) {
  switch (menuQuestions) {
    case "View All Departments":
      viewAllDepartments();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    case "View All Employees":
      viewAllEmployees();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Add Role":
      addRole();
      break;
    case "Add Employee":
      addEmployee()
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break;
/* Bonus Points
    case "Update Employee Manager":
      updateEmployeeManager();
      break;

    case "View Employee by Manager":
      ViewEmployeeByManager();
      break;

    case "View Employee by Department":
      ViewEmployeeByDepartment();
      break;
    case "Delete Departments":
      DeleteDepartments();
      break;
    case "Delete Roles":
      DeleteRoles();
      break;
    case "Delete Employees":
      DeleteEmployees();
      break;
    case "View Utilized Budget of a Department":
      ViewUtilizedBudgetOfADepartment();
      break;
*/
    case"Quit",
      console.log("Goodbye");
  }

}
// // query functions

// displays department table
function viewAllDepartments = () => {
function (err, { res }) {
  console.log(res);
}  
}

// displays roles table
function viewAllRoles = () => {
  function (err, { res }) {
    console.log(res);
  }  
}

// displays employees table
function viewAllEmployees = () => {
  function (err, { res }) {
    console.log(res);
  }  
}

// user prompted to enter the name of the department and that department is added to the database
function addDepartment();


// prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole();


// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee();


// prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeeRole();

/* Bonus Points
function updateEmployeeManager();
function viewEmployeeByManager();
function viewEmployeeByDepartment();
function deleteDepartments();
function deleteRoles();
function deleteEmployees();
function viewUtilizedBudgetOfADepartment();
 */



// function to initialize app
async function init() {
  inquirer.prompt(menuPrompts)

    .then()

}