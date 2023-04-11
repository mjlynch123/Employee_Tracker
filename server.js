const inquirer = require("inquirer");
const express = require("express");
const sql = require("mysql");
const uuid = require("./Helpers/uuid");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const options = [
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "Add Role",
  "View All Roles",
  "View All Departments",
  "Add Department",
  "Quit",
];

// Connect to database
const db = sql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Password1",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// Function to show follow-up questions based on user's input
function followUpQuestions(answer) {
  // *Switch statement that will determine which follow up question to ask
  switch (answer.ID) {
    case "View All Employees":
        // * Calling the select method so that we can  get everything inside of the employees table
      const query = "SELECT * FROM employees";
      db.query(query, (err, results) => {
        if (err) throw err;

        // Display the fetched data in the console
        console.log("Employees:");
        // * Making sure that the results are logged in a table
        console.table(results);
        init();
      });
    case "Add Employee":
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "First Name:",
          },
          {
            type: "input",
            name: "last_name",
            message: "Last Name:",
          },
          {
            type: "input",
            name: "department",
            message: "Department:",
          },
          {
            type: "input",
            name: "salary",
            message: "Salary:",
          },
          {
            type: "input",
            name: "manager",
            message: "Manager:",
          },
        ])
        .then((answers) => {
          console.log("Answers:", answers);

          // * Insert the collected employee information into the database
          // * Set a default value for the role_id column
          const role_id = 1; // * Set the default role_id value to 1 or any other valid role_id value as per your requirements

          // * Insert the collected employee information into the database with the default role_id value
          const query =
            "INSERT INTO employees (first_name, last_name, role_id, department, salary, manager) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [
            answers.first_name,
            answers.last_name,
            role_id, // * Use the default role_id value
            answers.department,
            answers.salary,
            answers.manager,
          ];
          db.query(query, values, (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " employee inserted!\n");
            init();
          });
        })
        .catch((error) => console.error(error));
      break;
    case "Update Employee Role":
      inquirer
        .prompt([
          {
            type: "input",
            name: "employeeId",
            message: "Enter employee ID:",
          },
          {
            type: "input",
            name: "newJobTitle",
            message: "Enter new job title:",
          },
        ])
        .then((answers) => {
          const { employeeId, newJobTitle } = answers;

          // Update the job title in the database
          const query = "UPDATE employees SET title = ? WHERE id = ?";
          db.query(query, [newJobTitle, employeeId], (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " employee's job title updated!\n");
          });
          init();
        })
        .catch((error) => console.error(error));
      break;
    case "View All Roles":
        db.query("SELECT * FROM roles", (err, results) => {
            if (err) throw err;

            console.table(results);
            init();
        })
        break;
    case "Add Role":
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Roll Title:",
          },
          {
            type: "input",
            name: "department",
            message: "Department:",
          },
          {
            type: "input",
            name: "salary",
            message: "Salary:",
          },
        ])
        .then((answers) => {
          const departmentQuery =
            "SELECT id FROM departments WHERE department_name = ?";
          const departmentValues = [answers.department];
          db.query(departmentQuery, departmentValues, (err, res) => {
            if (err) throw err;

            if (res.length === 0) {
              console.log(
                "Invalid department name. Please enter a valid department."
              );
              // Close the database connection
              db.end();
              return;
            }

            const departmentId = res[0].id;

            const query =
              "INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)";
            const values = [answers.title, departmentId, answers.salary];

            db.query(query, values, (err, res) => {
              if (err) throw err;
              console.log(res.affectedRows + " role inserted!\n");
              // Close the database connection
              db.end();
              init();
            });
          });
        });
      break;
    ca
    case "View All Departments":
      const queryDepartments = "SELECT * FROM departments";
      db.query(queryDepartments, (err, results) => {
        if (err) throw err;

        // Display the fetched data in the console
        console.log("Employees:");
        console.table(results);
        init();
      });
      break;
    case "Add Department":
      inquirer
        .prompt([
          {
            type: "input",
            name: "department_name",
            message: "Please enter the name of the department: ",
          },
        ])
        .then((answers) => {
          const query = "INSERT INTO departments (department_name) VALUES (?)";
          const values = [answers.department_name];
          db.query(query, values, (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
            init();
          });
        });
      break;
    case "Quit":
      console.log("Quitting the application...");
      process.exit(0); // Exit the application with exit code 0
    default:
      // Handle invalid input
      console.error("Invalid option selected");
      break;
  }
}

// * Creating a function that will be ran at the start of the program and everytime after the user makes a choice
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "ID",
      message: "What would you like to do: ",
      choices: options,
    })
    .then((response) => {
      followUpQuestions(response);
    });
}

init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
});
