// require variables
var table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");

// connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Redsox4093!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
     startPrompt();
});

// create prompt to begin running the app
function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Would you like to take a look at out inventory?",
        default: true
    }]).then(function(user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Okay, come back soon.");
        }
    });
}