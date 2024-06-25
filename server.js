const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");
const util  = require('util');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: "postgres",
    // Enter PostgreSQL password
    password: "!*5642INdian",
    host: "localhost",
    database: "employee_db",
  });
  console.log("Connected to the employee_db database!");

  pool.query = util.promisify(pool.query);

pool.connect(function (err) {
  if (err) throw err;
  menuPrompts();
});

console.table('EMPLOYEE TRACKER');


// Initial prompt to user utilizing command line interface.
const menuPrompts = async () => {
  try {
    let answer = await inquirer.prompt({
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
        "Quit"
    ]
  });
  // switch statement to select follow on questions and provide responses to user
  switch (answer.menuQuestions) {
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
    case "Quit":
      console.log("Goodbye");
      break;
    };
  }catch (err) {
    console.log(err);
    menuPrompts();
  }
}

// displays department table
const viewAllDepartments = async () => {
  console.log("View All Departments");
  try{
    pool.query('SELECT * FROM department', function (err, res) {
    // console.log(rows);
    // if (err) throw err;


    console.log('SHOW res', res);

    let departmentArray = [];
    res.forEach(department => departmentArray.push(department));
    console.table(departmentArray);
    menuPrompts()
  });
  } catch (err) {
    console.log(err);
    menuPrompts();
  };
};


// displays roles table
const viewAllRoles = async() => {
  console.log("View All Roles")
  try{
    pool.query("SELECT * FROM role", function (err, res) {
    console.log(res);
    if (err) throw err;

    console.log('SHOW res.rows', res.rows);
    console.log('SHOW res', res);

    let roleArray = [];
    res.rows.forEach(role => roleArray.push(role));
    console.table(roleArray);
    menuPrompts()
  });
  }catch (err) {
    console.log(err);
    menuPrompts();
  };
};

// displays employees table
const viewAllEmployees = async() => {
  console.log("View All Employees")
  try{
    pool.query("SELECT * FROM employee", function (err, res) {

    if (err) throw err;

    console.log('SHOW res.rows', res.rows);
    console.log('SHOW res', res);

    let employeeArray = [];
    res.rows.forEach(employee => employeeArray.push(employee));
    console.table(employeeArray);
    menuPrompts()
  });
  }catch (err) {
    console.log(err);
    menuPrompts();
  };
};
// user prompted to enter the name of the department and that department is added to the database
const addDepartment = async() => {
  try{
    console.log("Add a new Department");

    let answer = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new Department",
      name: "newDepartment",
    },
  ])

  let result = await pool.query("INSERT INTO department", { name: answer.newDepartment});

  console.log(`Successfully add ${answer.newDepartment} to department`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};

// prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = async() => {
  try{
  console.log("Add a new Role");

  let departments = await pool.query("SELECT * FROM department")

  let answer =await inquirer.prompt([
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
    let givenDept;
    for(let i = 0; i < departments.length; i++) {
      if(departments[i].department_ID === answer.choice) {
        givenDept = departments[i];
      }
    }
    
  let result = await pool.query("INSERT INTO role", { title: answer.newRole, salary: answer.salary, department_id: answer.roleID });

  console.log(`Successfully add ${answer.newRole} to department`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};

// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = async() => {
  try{
  console.log("Add an new Employee");

    let roles = await pool.query("SELECT * FROM role");

    let managers = await pool.query("SELECT * FROM employee");

  let answer = await inquirer.prompt([
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

  let result = await pool.query("INSERT INTO employee", { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.newEmployeeRole, manager_id: answer.manager, });

  console.log(`Successfully add ${answer.first_name} ${answer.last_name} to employee`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};
// prompted to select an employee to update and their new role and this information is updated in the database 
const updateEmployeeRole = async() => {
  try{
  console.log("Update an Employee");

  let employees = await pool.query("SELECT FROM employee");
  
  let employeeAnswer = await inquirer.prompt([
    {
      type: "list", 
      message: "Which employee do you want to update?",
      name: "updatedEmployee",
      choices: employees.map((employeesName) => {
        return {
          name: employeesName.first_name + " " + employeesName.last_name,
          value: employeesName.id,
        }
      }),
    }
  ]);
    let rolesUpdate = await pool.query("SELECT FROM role");

    let roleAnswer = await inquirer.prompt([
      {
        type: "list", 
        message: "What is their new role?",
        name: "updatedRole",
        choice: rolesUpdate.map((rolesName)=> {
          return {
            name: rolesName.title,
            value: rolesName.id,
          }
        })
      }
  ])
  let result = await pool.query(`UPDATE employee's information`, { role_id: roleAnswer.updatedRole, id: roleAnswer.updatedEmployee, });

  console.log(`The Employee's role was successfully updated`);
  menuPrompts();

  }catch (err) {
    console.log(err);
    menuPrompts();
};
};



/* Bonus Points
const updateEmployeeManager = async() => {
const viewEmployeeByManager = async() => {
const viewEmployeeByDepartment = async() => {
const deleteDepartments = async() => {
const deleteRoles = async() => {
const deleteEmployees = async() => {
const viewUtilizedBudgetOfADepartment = async() => {
*/