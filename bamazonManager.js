// require variables
var Table = require("cli-table");
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

function startPrompt() {
    inquirer.prompt([{
       type: "list",
       name: "promptList",
       message: "What would you like to review?",
       choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"] 
    }]).then(function(user) {
        if (user.promptList === "View products for sale") {
            inventory();
        } else if (user.promptList === "View low inventory") {
            low_inentory();
        } else if (user.promptList === "Add to inventory") {
            add_inventory();
        } else if (user.promptList === "Add new product") {
            add_product();
        }
    });
}
