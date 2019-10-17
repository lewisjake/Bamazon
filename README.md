# Bamazon
DESCRIPTION

This application uses node commands in the terminal to access an Amazon-like online shopping store.  

SET-UP

Using MySql, create a database with a table inside of it called products. It should hold values for an id number, the name of the product, the department the product belongs in, and the price of the product. Once that is built, create a javascript file that will control the app. 

APPLICATION

Using MySql, inquirer, and cli-table npm packages I was able to connect to MySql and format my Javascript properly. The app begins by running a node command (node bamazonCustomer or node bamazonManager) depending on what you are trying to access. The bamazonCustomer prompts the user if they would like to view the inventory of the store. If they accept, the inventory is displayed. If they decline the program will end. When the inventory is displayed, the user will be prompted if they would like to purchase an item. If they say yes, they will be prompted to enter the id number of the item they would like and how many units of that item they would like. If the item and quantity the user enters is available for purchase they will be asked if they are sure they want to buy that item and amount and a fulfillment message will be displayed along with the item info and the total price. If the item and quantity the user inputs is not in stock, or they input a higher quantity than the current inventory a message will be displayed letting them know the order cannot be fulfilled. The app will then update the amount of stock in the inventory after the purchase. When bamazonManager is ran in node the app will display a list of four manager functions. The 'view products for sale' option will run a function that pulls data from MySql database of the current inventory of the bamazon store. The 'view low inventory' option displays any inventory that has less than 5 in stock. After that function is ran it will bring you back to the start of the program. The 'Add to inventory' option will run a function that allows the manager to set the amount of items to be stocked for a certain product. The manager will prompted to enter the id number of the product and the number of items that should be stocked for that item. After that input is entered, the database will be updated and returned back to the start of the app. The 'Add new product' option allows the manager to create a new product and add it into the database. The manager will the prompted to enter the name of the new product, which department is belongs in, the price if the item, and the quantity that should be stocked. After entering this input, the app will update the database with this new product and return to the start of the app.

DEMO

View the functioning app in the images folder of this Repo.