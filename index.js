let menu = [
    { item_id: 1, item_name: "pizza", item_price: "5" },
    { item_id: 2, item_name: "burger", item_price: "3" },
    { item_id: 3, item_name: "drink", item_price: "1" },
    { item_id: 4, item_name: "pasta", item_price: "3" },
    { item_id: 5, item_name: "salad", item_price: "2" },
];
let number = 1, order_list = [];
let new_order = {
    order_id: null,
    table_id: null,
    order_items: [
        { item_id: null, item_name: null, item_price: null, item_quantity: null },
    ]
};
let tables = [
    { table_id: "1", is_available: true },
    { table_id: "2", is_available: true },
    { table_id: "3", is_available: true },
    { table_id: "4", is_available: true },
    { table_id: "5", is_available: true },
];

const readline = require("readline");
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function add_item_in_menu(id, name, price) {
    newItem = {
        item_id: id,
        item_name: name,
        item_price: price,
    };
    menu.push(newItem);
}

function modify_item_in_menu(id, name, price) {
    for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if (element.item_id == id) {
            element.item_price = price;
            element.item_name = name;
            return;
        }
    }
    console.log(`Item with id ${id} not found!`);
}

function remove_item_from_menu(id) {
    for (let index = 0; index < menu.length; index++) {
        let element = menu[index];
        if (element.item_id == id) {
            menu.splice(index, 1);
            return;
        }
    }
    console.log(`Item with id ${id} not found!`);
}

function display_menu(menu) {
    console.log("\nDisplaying Menu... \n");
    console.log("ID".padEnd(5) + "Item Name".padEnd(20) + "Per unit price($)".padStart(10));
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        // console.log(index + 1, ". ", item.item_name, "(", item.item_price, ")");
        console.log(`${item.item_id}`.padEnd(5) + `${item.item_name}`.padEnd(20) + `${item.item_price}`.padStart(10))
    }
    console.log(" ");
}

function add_item() {
    askForNewItemID();

    function askForNewItemID() {
        r1.question("\nEnter the ID for the new item: ", (id) => {
            id = id.trim();

            // Check if the ID already exists
            let item_exists = menu.some((item) => item.item_id == id);

            if (item_exists) {
                console.log(`\nItem with ID ${id} already exists. Please enter a unique ID \n`);
                askForNewItemID(); // Ask for ID again
            } else {
                console.log(`\nID ${id} is available \n`);
                askForNewItemDetails(id);
            }
        });
    }

    function askForNewItemDetails(id) {
        r1.question("\nEnter the item's name and price (comma-separated): ", (answer) => {
            const [name, price] = answer.trim().split(",").map((value) => value.trim());

            // Validate Name
            if (!name) {
                console.log("Invalid name. Please enter a valid item name \n");
                return askForNewItemDetails(id); // Ask again without re-entering the ID
            }

            // Validate Price
            if (isNaN(price) || price <= 0) {
                console.log("Invalid price. Please enter a positive number \n");
                return askForNewItemDetails(id); // Ask again without re-entering the ID
            }

            // Add the item to the menu
            add_item_in_menu(id, name, price);
            console.log(`\nItem '${name}' (ID: ${id}) has been successfully added to the menu \n`);
            manager_menu();
        });
    }
}

function modify_item() {
    promptItemID();

    function promptItemID() {
        r1.question("Enter the id of the item you want to modify: ", (id) => {
            id = id.trim();

            // Check if the entered ID exists in the menu
            let item_index = menu.findIndex((item) => item.item_id == id);

            if (item_index !== -1) {
                promptItemDetails(id); // Ask for name and price
            } else {
                console.log(`Item with id ${id} is not present. Please enter a valid id \n`);
                promptItemID(); // Ask for ID again
            }
        });
    }

    function promptItemDetails(id) {
        r1.question("Enter the updated name and price (comma-separated): ", (answer) => {
            const [name, price] = answer.trim().split(",").map((value) => value.trim());

            if (!name || isNaN(price) || price <= 0) {
                console.log("Invalid input. Ensure name is provided and price is a positive number \n");
                promptItemDetails(id); // Ask for name and price again
            } else {
                modify_item_in_menu(id, name, price);
                console.log("Item deatils updated \n")
                manager_menu();
            }
        });
    }
}

function remove_item() {
    promptItemID();

    function promptItemID() {
        r1.question("Enter the id of the item you want to remove: ", (id) => {
            id = id.trim();

            // Check if the entered ID exists in the menu
            let item_index = menu.findIndex((item) => item.item_id == id);

            if (item_index !== -1) {
                remove_item_from_menu(id);
                console.log("Item removed successfully \n")
                manager_menu();
            } else {
                console.log(`Item with id ${id} is not present. Please enter a valid id \n`);
                promptItemID(); // Ask for ID again
            }
        });
    }
}

function manager_menu() {
    console.log("1. Add a new item \n2. Update an item \n3. Remove an item \n4. Dispaly Menu \n[B] Go Back \n[E] Exit \n");
    r1.question("What do you want to do? ", (answer) => {
        if (answer.trim() == "E" || answer.trim() == "e") {
            r1.close()
            process.exit()
        } else if (answer.trim() == "B" || answer.trim() == "b") {
            main()
        } else if (isNaN(answer.trim())) {
            console.log("Invalid input! \n")
            manager_menu()
        } else {
            if (answer.trim() == "1") {
                add_item();
            } else if (answer.trim() == "2") {
                modify_item();
            } else if (answer.trim() == "3") {
                remove_item();
            } else if (answer.trim() == "4") {
                display_menu(menu);
                manager_menu();
            }
        }
    });
}

function tables_available() {
    console.log("Available tables:");
    for (let index = 0; index < tables.length; index++) {
        const element = tables[index];
        console.log(`Table ${index + 1}: ${element.is_available}`);
    }
    r1.question("\nPlease choose a table no.: ", (answer) => {
        if (isNaN(answer.trim())) {
            console.log("Invalid table number. Please enter a valid number \n")
            tables_available()
        } else if (!isNaN(answer.trim()) && (answer.trim() < 0 || answer.trim() > 5)) {
            console.log("Invalid table number entered \n")
            tables_available()
        } else {
            if (tables[answer.trim() - 1].is_available) {
                console.log("Available \n");
                new_order = { table_id: `${answer.trim()}` };
                // table = answer
                tables[answer.trim() - 1].is_available = false;
                select_order();
                // customer_menu()
            } else if (!tables[answer.trim() - 1].is_available) {
                console.log("Occupied \n");
                tables_available();
            } else {
                console.log("Invalid number entered. Please enter a valid number! \n");
                tables_available();
            }
        }
    });
}

function item_already_present_in_menu(id) {
    for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if (element.item_id == id) {
            return index;
        }
    }
    return false;
}

function select_order() {
    promptItemID();

    function promptItemID() {
        r1.question("Enter item's id and quantity: ", (answer) => {
            const [id, quantity] = answer.trim().split(",").map((value) => value.trim());

            // Validate item id
            if (!id || isNaN(id)) {
                console.log("Invalid item id entered. Please enter a valid id \n");
                promptItemID(); // Re-prompt for both id and quantity
                return; // Exit function early to prevent further execution
            }

            let return_value = item_already_present_in_menu(id);
            if (return_value !== false) {
                promptQuantity(id, return_value, quantity); // Only prompt for quantity if id is valid
            } else {
                console.log("Item with this id is not present \n");
                promptItemID();
            }
        });
    }

    function promptQuantity(id, return_value, quantity) {
        if (isNaN(quantity) || quantity <= 0) {
            console.log("Invalid quantity entered. Quantity must be a positive number.");
            r1.question("Enter the quantity for the item: ", (quantity) => {
                promptQuantity(id, return_value, quantity); // Keep asking for quantity until it's valid
            });
        } else {
            new_order.order_id = `${number}`;
            new_order.order_items = []; // Clear previous placeholder or items
            new_order.order_items.push({
                item_id: `${id}`,
                item_name: `${menu[return_value].item_name}`,
                item_price: `${menu[return_value].item_price}`,
                item_quantity: `${quantity}`,
            });
            number++;
            order_list.push({ ...new_order }); // Push a copy of the order to the list
            console.log("Order placed successfully \n")
            customer_menu();
        }
    }
}

function place_order() {
    tables_available();
}

function view_order_summary() {
    r1.question("Enter your table number: ", (answer) => {
        if (isNaN(answer.trim())) {
            console.log("Please enter a valid table number \n")
            view_order_summary()
        } else {
            for (let index = 0; index < tables.length; index++) {
                const element = tables[index];
                if (element.table_id == answer.trim() && element.is_available == false) {
                    const view_summary = order_list.find(
                        (order) => order.table_id == answer.trim()
                    );

                    if (view_summary != undefined) {
                        console.log(`\nOrder Summary for Table ${answer.trim()}:`);
                        console.log(`Order ID: ${view_summary.order_id}\n`);
                        for (
                            let index = 0;
                            index < view_summary.order_items.length;
                            index++
                        ) {
                            const element = view_summary.order_items[index];

                            console.log(`Item Name: ${element.item_name}`);
                            console.log(`Quantity: ${element.item_quantity}`);
                            console.log(`Per unit price: $${element.item_price}\n`);
                        }
                        break;
                    }
                } else {
                    console.log(`No orders found for Table ${answer.trim()} \n`);
                    break;
                }
            }
            customer_menu();
        }

    });
}

function add_item_in_existing_order() {
    r1.question("\nEnter your table number: ", (answer) => {
        if (isNaN(answer.trim())) {
            console.log("Please enter a valid table number \n");
            add_item_in_existing_order();
        } else {
            // Find the existing order for the table
            let table_order = order_list.find((order) => order.table_id == answer.trim());
            if (table_order) {
                promptItemID(table_order);  // Pass table_order to the next function
            } else {
                console.log(`No existing order for table ${answer.trim()}`);
                customer_menu();
            }
        }
    });

    function promptItemID(table_order) {  // Accept table_order as a parameter
        r1.question("Enter the id of the item you want to add: ", (answer) => {
            if (isNaN(answer.trim())) {
                promptItemID(table_order);  // Pass table_order when calling again
            } else {
                const id = answer.trim();
                let return_value = item_already_present_in_menu(id);

                if (return_value !== false) {
                    promptQuantity(table_order, id, return_value);  // Pass table_order, id, and return_value
                } else {
                    console.log("Item with this id is not present in the menu \n");
                    customer_menu();
                }
            }
        });
    }

    function promptQuantity(table_order, id, return_value) {  // Accept table_order, id, and return_value as parameters
        r1.question("Enter the quantity for the item: ", (quantity) => {
            if (isNaN(quantity) || quantity < 1) {
                console.log("Invalid quantity entered. Quantity must be greater than 0 \n");
                promptQuantity(table_order, id, return_value);  // Pass table_order, id, and return_value again
            } else {
                // Add the new item to the existing order
                table_order.order_items.push({
                    item_id: `${id}`,
                    item_name: `${menu[return_value].item_name}`,
                    item_price: `${menu[return_value].item_price}`,
                    item_quantity: `${quantity}`,
                });
                console.log("Item added to the existing order \n");
                customer_menu();
            }
        });
    }
}

function remove_item_from_existing_order() {
    r1.question("\nEnter your table number: ", (answer) => {
        if (isNaN(answer.trim())) {
            console.log("please enter a valid table number \n")
            remove_item_from_existing_order()
        } else {
            // Find the existing order for the table
            let table_order = order_list.find((order) => order.table_id === answer.trim());

            if (table_order) {
                promptItemID()
                function promptItemID() {
                    r1.question("Enter the id of the item you want to remove: ", (answer) => {
                        if (isNaN(answer.trim())) {
                            promptItemID()
                        } else {
                            const id = answer.trim();
                            // if there is only one item ordered and you want to remove it, cancel the whole order from that table and mark the table as available
                            if (table_order.order_items.length == 1) {
                                let table_order_index = order_list.findIndex(
                                    (order) => order.table_id === answer.trim()
                                );
                                let find_table_id = table_order.table_id;
                                let table_to_be_changed = tables.find(
                                    (table) => table.table_id == find_table_id
                                );
                                table_to_be_changed.is_available = true;
                                console.log(`Order for this table has been cancelled and Table ${find_table_id} is now available \n`);
                                order_list.splice(table_order_index, 1);
                                customer_menu();
                            } else {
                                let item_index = table_order.order_items.findIndex(
                                    (order) => order.item_id == id
                                );
                                if (item_index != -1) {
                                    table_order.order_items.splice(item_index, 1);
                                    console.log("Item removed successfully \n")
                                } else {
                                    console.log("Item with this id is not present in the menu \n");
                                }
                                customer_menu();
                            }
                        }
                    });
                }
            } else {
                console.log(`No existing order for table ${answer.trim()}`);
                customer_menu();
            }
        }

    });
}

function change_the_quantity() {
    function promptTableNumber() {
        r1.question("\nEnter your table number: ", (tableNumber) => {
            if (isNaN(tableNumber.trim())) {
                console.log("Invalid input. Please enter a valid table number \n");
                return promptTableNumber(); // Re-prompt ONLY for table number
            }

            let table_order = order_list.find((order) => order.table_id === tableNumber.trim());
            if (!table_order) {
                console.log(`No existing order for table ${tableNumber.trim()} \n`);
                customer_menu() // Re-prompt ONLY for table number
            }

            // Proceed to item ID input
            promptItemID(table_order);
        });
    }

    function promptItemID(table_order) {
        r1.question("Enter the ID of the item whose quantity you want to change: ", (itemID) => {
            if (isNaN(itemID.trim())) {
                console.log("Invalid input. Please enter a valid item ID \n");
                return promptItemID(table_order); // Re-prompt ONLY for item ID
            }

            let item_exists = table_order.order_items.find((order) => order.item_id == itemID.trim());
            if (!item_exists) {
                console.log("Item with this ID does not exist \n");
                return promptItemID(table_order); // Re-prompt ONLY for item ID
            }

            // Proceed to quantity input
            promptQuantity(table_order, itemID.trim());
        });
    }

    function promptQuantity(table_order, itemID) {
        r1.question("Enter the new quantity for the item: ", (quantity) => {
            if (isNaN(quantity.trim()) || parseInt(quantity.trim()) < 1) {
                console.log("Invalid input. Please enter a valid quantity (must be a number greater than 0).");
                return promptQuantity(table_order, itemID); // Re-prompt ONLY for quantity
            }

            // Update quantity in the order
            let item_index = table_order.order_items.findIndex((order) => order.item_id == itemID);
            table_order.order_items[item_index].item_quantity = quantity.trim();

            console.log(`Quantity updated successfully!`);
            customer_menu(); // Go back to the main menu after updating
        });
    }
    promptTableNumber()
}

function update_order() {
    console.log("1. Add a new item in existing order \n2. Remove an item from existing order \n3. Change the quantity of an existing item");
    r1.question("What changes you want to do? ", (answer) => {
        if (isNaN(answer.trim()) || (answer < 0) || answer > 3) {
            console.log("Invalid choice entered \n")
            update_order()
        } else {
            if (answer.trim() == 1) {
                add_item_in_existing_order();
            } else if (answer.trim() == 2) {
                remove_item_from_existing_order();
            } else if (answer.trim() == 3) {
                change_the_quantity();
            }
        }
    });
}

function cancel_order() {
    r1.question("Enter your table number: ", (answer) => {
        if (!isNaN(answer.trim())) {
            // Find the existing order for the table
            let table_order = order_list.find((order) => order.table_id === answer.trim());

            if (table_order) {
                let table_order_index = order_list.findIndex(
                    (order) => order.table_id === answer.trim()
                );
                let find_table_id = table_order.table_id;
                let table_to_be_changed = tables.find(
                    (table) => table.table_id == find_table_id
                );
                table_to_be_changed.is_available = true;
                console.log(`Table ${find_table_id} available `);
                order_list.splice(table_order_index, 1);
                console.log(`Order for table ${table_order.table_id} has been cancelled \n`);
                customer_menu();
            } else {
                console.log(`No existing order for table ${answer.trim()} \n`);
                customer_menu();
            }
        } else {
            console.log("Please enter a valid table number \n")
            cancel_order()
        }
    });
}

function generate_bill() {
    r1.question("Enter your table no.: ", (answer) => {
        if (!isNaN(answer.trim())) {
            let table_order = order_list.find((order) => order.table_id == answer.trim());
            if (table_order != undefined) {
                let total_sum = 0
                console.log("\n" + "Item Name".padEnd(20) + "| " + "Quantity".padEnd(10) + "| " + "Per unit price".padEnd(18) + "| " + "Total price".padStart(10));
                table_order.order_items.forEach((element) => {
                    total_sum += (parseFloat(element.item_price) * parseFloat(element.item_quantity));
                    console.log(`${element.item_name}`.padEnd(20) + "| " + `${element.item_quantity}`.padEnd(10) + "| " + `${element.item_price}`.padEnd(18) + "| " + `${parseInt(element.item_price) * parseInt(element.item_quantity)}`.padStart(10));
                });
                console.log(`\n` + `*`.repeat(58) + `\n` + `Sub Total: ${total_sum} \nGST(16%): ${0.16 * total_sum} \nTotal Bill: ${total_sum * (1.16)}` + `\n\nThanks for visiting us! \n\n ` + `*`.repeat(58) + `\n`)
            } else {
                console.log("No order has been placed for this table \n");
            }
            customer_menu()
        } else {
            console.log("Please enter a valid table number \n")
            generate_bill()
        }
    });
}

function customer_menu() {
    console.log("1. View Menu \n2. PLace Order \n3. View Order Summary \n4. Update Order \n5. Cancel Order \n6. Generate Bill \n[B] Go Back \n[E] Exit \n");
    r1.question("Enter your choice: ", (answer) => {
        if (answer.trim() == "E" || answer.trim() == "e") {
            r1.close()
            process.exit()
        } else if (answer.trim() == "B" || answer.trim() == "b") {
            main()
        } else if (!isNaN(answer.trim()) && (answer.trim() > 0 && answer.trim() < 8)) {
            if (answer.trim() == "1") {
                display_menu(menu);
                customer_menu();
            } else if (answer.trim() == "2") {
                place_order();
            } else if (answer.trim() == "3") {
                view_order_summary();
            } else if (answer.trim() == "4") {
                update_order()
            } else if (answer.trim() == "5") {
                // just ask for the table no and remove that index from the order_list
                // remember to change availability of that table as true
                // after whole process, display the main menu to the user
                cancel_order();
            } else if (answer.trim() == "6") {
                generate_bill();
            } else if (answer.trim() == "7") {
                main();
            }
        } else {
            console.log("Please enter a valid number \n")
            customer_menu()
        }
    });
}

function main() {
    console.log("1. Manager \n2. Employee \n3. Customer \n[E] Exit \n");
    r1.question("What's your role? ", (answer) => {
        if (!isNaN(answer.trim()) && (answer.trim() > 0 && (answer.trim()) < 5)) {
            if (answer.trim() == "1") {
                manager_menu();
            } else if (answer.trim() == "2") {
            } else if (answer.trim() == "3") {
                customer_menu();
            } else if (answer.trim() == "E" || answer.trim() == "e") {
                r1.close()
                process.exit()
            }
        } else {
            console.log("Please enter a valid number \n")
            main()
        }
    });
}

main();