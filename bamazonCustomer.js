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

// function to display inventory tot the user
function inventory() {
    // create table for inventory
    var table = new Table({
        head: ['Id', 'Item', "Department", "Price", "Quantity"],
        colWidths: [10, 40, 40, 40, 40,]
    });
    showInventory();

    // grab table from mysql and display to user
    function showInventory() {
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                var item_id = res[i].item_id,
                product_name = res[i].product_name,
                department_name = res[i].department_name,
                price = res[i].price,
                stock_quantity = res[i].stock_quantity;

                table.push([item_id, product_name, department_name, price, stock_quantity]);
            }
            console.log("");
            console.log("====================================================== Current Bamazon Inventory ======================================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            // continuePrompt();
        });
    }
}