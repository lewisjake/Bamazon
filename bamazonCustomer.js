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

// function to display inventory to the user
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
             continuePrompt();
        });
    }
}

// create function to continue the prompt with user to see if they would
// like to purchase anything from the inventory. give an option for the user to
// buy if they would like.
function continuePrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item from our inventory?",
        default: true
    }]).then(function(user) {
        if (user.continue === true) {
            buyPrompt();
        } else {
            console.log("Okay, come back soon.");
        }
    });
}

function buyPrompt() {
    inquirer.prompt([{
        type: "input",
        name: "inputId",
        message: "Please enter the ID number of the item you would like to purchase.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units would you like to purchase?",
    
    }]) .then(function(userPurchase) {
        // check database to see if that product is in stock
        // if user wants to purchase more than is in stock, decline the purchase
        // and send them a message
        connection.query("SELECT * FROM products WHERE item_id=?" , userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                if (userPurchase.inputNumber > res[i].stock_quantity) {
                    console.log("Sorry, we do not have enough in stock. Try again at a different time.");
                    startPrompt();
                } else {
                    console.log("Order fulfilled.");
                    console.log("--------------------------------------------------");
                    console.log("You selected: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("--------------------------------------------------");

                    var updateStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchase_id = (userPurchase.inputId);
                    console.log(updateStock);
                    confirmPurchase(updateStock, purchase_id);
                }
            }
        });
    });
}

function confirmPurchase(updateStock, purchase_id) {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmPurchase",
        message: "Would you like to purchase this item and quantity",
        default: true
    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {
            // if true, update mysql with new stock level
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateStock },
                {
                   item_id: purchase_id 
                }], function(err, res) {});
                console.log("--------------------------------------");
                console.log("Transaction Complete!");
                console.log("--------------------------------------");
                startPrompt();
            } else {
                console.log("--------------------------------------");
                console.log("Okay, come back soon.");
                console.log("--------------------------------------");
                startPrompt();
            }
        });
    }

