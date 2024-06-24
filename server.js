const express = require("express");
const sequelize = require("./db/connection");
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
    message: "What would you like to do? (Use the up/down arrow keys to select, then press ENTER)",
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
    case "Quit":
      console.log("Goodbye");
  }

}
// // query functions

/* Basic layout - from mini project
pool.query(
  "SELECT id, movie_name AS title FROM movies",
  function (err, { rows }) {
    console.log(rows);
    if (err) res.status(500).json({ error: err.message });

    res.json({
      message: "success",
      data: rows,
    });
  }
);
});
*/

// displays department table
function viewAllDepartments() {
  try{
    db.query("SELECT * FROM department", function (err, { res }) {
    console.log(res);
    if (err) throw err;

    let departmentArray = [];
    res.forEach(department => departmentArray.push(department));
    console.table(departmentArray);
    menuPrompts()
  });
  }catch (err) {
    console.log(err);
    menuPrompts();
  };
};


// displays roles table
function viewAllRoles() {
  try{
    db.query("SELECT * FROM role", function (err, { res }) {
    console.log(res);
    if (err) throw err;

    let roleArray = [];
    res.forEach(employee => employeeArray.push(employee));
    console.table(employeeArray);
    menuPrompts()
  });
  }catch (err) {
    console.log(err);
    menuPrompts();
  };
};

// displays employees table
function viewAllEmployees() {
  try{
    db.query("SELECT * FROM employee", function (err, { res }) {
    console.log(res);
    if (err) throw err;

    let employeeArray = [];
    res.forEach(employee => employeeArray.push(employee));
    console.table(employeeArray);
    menuPrompts()
  });
  }catch (err) {
    console.log(err);
    menuPrompts();
  };
};
// user prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  try{
    console.log("Add a new Department");

    let answer = inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new Department",
      name: "newDepartment",
    },
  ])

  let result = db.query("INSERT INTO department", { name: answer.newDepartment});

  console.log(`Successfully add ${answer.newDepartment} to department`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};

// prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  try{
  console.log("Add a new Role");

  let departments = db.query("SELECT * FROM department")

  let answer = inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new Role",
      name: "newRole",
    },
    {
      type: "input",
      message: "Enter the salary for the new Role",
      name: "newRoleSalary",
    },
    {
      type: "list",
      message: "Enter department ID for the new Role",
      name: "departmentID",
      choices: departments.map((departmentID) => {
        return {
        name:departmentID.name,
        value: departmentID.id,
        }
      }),
    }
  ]);

    // need to add new Role ID number into departments
    let givenDept = 0;
    for(let i = 0; i < departments.length; i++) {
      if(departments[i].department_ID === answer.choice) {
        givenDept = department[i];
      }
    }
    
  let result = db.query("INSERT INTO role", { title: answer.newRole, salary: answer.salary, department_id: answer.roleID });

  console.log(`Successfully add ${answer.newRole} to department`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};

// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  try{
  console.log("Add an new Employee");

    let roles = db.query("SELECT * FROM role");

    let managers = db.query("SELECT * FROM employee");

  let answer = inquirer.prompt([
    {
      type: "input",
      message: "Enter the first name of the new Employee",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the new Employee",
      name: "last_name",
    },
    {
      type: "list",
      message: "Enter the role ID of the new Employee",
      name: "newEmployeeRole",
      choices: roles.map((role) => {
        return{
        name:newEmployeeRole.name,
        value: newEmployeeRole.id,
        }
      }),
    },
    {
      type: "list", // need to create list
      message: "Who will be the manager for the new Employee",
      name: "manager",
      choices: managers.map((manager) => {
        return {
          name:manager.first_name + " " + manager.last_name,
          value: manager.id,
        }
      }),
    }
  ])

  let result = db.query("INSERT INTO employee", { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.newEmployeeRole, manager_id: answer.manager, });

  console.log(`Successfully add ${answer.first_name} ${answer.last_name} to employee`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};
// prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeeRole() {
  try{
  console.log("Update an Employee");

  let employees = db.query("SELECT FROM employee");

  let rolesUpdate = db.query("SELECT FROM roll")

  let answer =inquirer.prompt([
    {
      type: "list", 
      message: "Which employee do you want to update?",
      name: "updatedEmployee",
      choices: employees.map((employeesName) => {
        return {
          name: employeesName.first_name + " " + employeesName.last_name,
          value: employeesName.id,
        }
      })
    },
    {
      type: "list", 
      message: "What is their new role?",
      name: "updatedRole",
      choice: roles.map((rolesName)=> {
        return {
          name: rolesName.title,
          value: rolesName.id,
        }
      })
      }
  ])
  let result = db.query(`UPDATE employee's information`, { role_id: answer.updatedRole, id: answer.updatedEmployee, });

  console.log(`The Employee's role was successfully updated`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};

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