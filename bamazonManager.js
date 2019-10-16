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

// create a function to prompt the manager a list of tasks to perform
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

// create a function to view the current inventory
function inventory() {
    // create table for inventory
    var table = new Table({
        head: ['Id', 'Item', "Department", "Price", "Quantity"],
        colWidths: [10, 40, 40, 40, 40,]
    });
    showInventory();

    // grab table from mysql and display to user
    // after the table is displayed, run a function to see if they would like to
    // buy anything
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
            console.log("----------------------------------------Current Bamazon Inventory ------------------------------------------");
            console.log("");
            console.log(table.toString());
            console.log("");
             startPrompt();
        });
    }
}

// create function to view low inventory
function low_inentory() {
    // use table to show the results on the low inventory
    var table = new Table({
        head: ['Id', 'Item', "Department", "Price", "Quantity"],
        colWidths: [10, 40, 40, 40, 40,]
    });
    showLowInventory();
    // connect to database to pull items that have less than 5 in stock
function showLowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            // check for stock below 5
            if (res[i].stock_quantity < 5) {
                var item_id = res[i].item_id,
                product_name = res[i].product_name,
                department_name = res[i].department_name,
                price = res[i].price,
                stock_quantity = res[i].stock_quantity;

                table.push([
                    item_id, product_name, department_name, price, stock_quantity
                ]);
            } 
        }
        console.log("");
        console.log("----------------------------------------Bamazon Low Inventory------------------------------------------");
        console.log("");
        console.log(table.toString());
        console.log("");
         startPrompt();
        });
    }
}

// create function to add stock to the inventory
function add_inventory() {
    // prompt user to see which item they would like to add to
    inquirer.prompt([{
        type: "input",
        name: "inputId",
        message: "Please enter the ID number of the item you would like to add stock to.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units would you like to add to the inventory?",
    }
    ])
}