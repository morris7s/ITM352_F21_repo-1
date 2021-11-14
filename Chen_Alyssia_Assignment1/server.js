/* 
 * A file to serve products data, display products page, validate purchase data, and provide an invoice for a purchase
 */

var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
var app = express();

app.use(myParser.urlencoded({ extended: true }));

var products_array = require('./products.json');
// FROM Lab13; Give each product a property of how many sold during this server round
products_array.forEach( (prod,i) => {prod.total_sold = 0});

var quantities_errors = [];

// For any internal requests from client side pages for the data
app.get("/product.js", function (request, response, next) {
    response.type('.js');
    // Returns js code that defines an array of products
    var products_str = `var products = ${JSON.stringify(products_array)};`;
    console.log("In request for data");
    response.send(products_str);
});

// Monitor all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });

// Specific client-side viewing routes:
// FROM Assignment1 MVC example
// This route will display a listing of the products and a form for users to indicate what they want to purchase
app.get("/store", function (request, response) {
    console.log("Get route for store")
    // Grab any url params if this is a get request due to an error in a form
    let urlparams = request.url.split("&");

    console.log("urlparams: " + urlparams);
    // Read in the contents of the template file to evaluate after
    var contents = fs.readFileSync('./views/display_products.template', 'utf8');
    response.send(eval('`' + contents + '`')); // render template string which will call the function below to actually display the products

    function display_products() {
        str = '';
        // For every product in the array, create an html section for it on the display products page. 
        // The onkeyup event does a client side check on the quantites the user enters by calling the checker functions
        // in the display_products.template
        if (urlparams[0] === "/store?error=Invalid%20Quantity") {
            str += ((urlparams[urlparams.length - 1]).split("=")[1] === "true") ? "<section>One of the quantities you ordered was beyond the stock we have. We have automatically adjusted the quantity to the maximum allowable.</section>" : "";
            str += ((urlparams[urlparams.length - 2]).split("=")[1] === "true") ? "<section>One of the quantities you ordered had an invalid value. Please enter only valid (positive) numbers.</section>" : "";
            
        }
        for (i = 0; i < products_array.length; i++) {
            str += `
                <section class="item">
                    <h2>${products_array[i].flower}</h2>
                    <p>$${products_array[i].price}</p>
                    <label id="quantity${i}_label"}">Quantity</label>
                    <input type="text" placeholder="0" name="quantity${i}"
                    onkeyup="checkQuantityTextbox(this);" `;
            // Maintain stickiness
            if (urlparams[0] === "/store?error=Invalid%20Quantity") {
                let pastValue = (urlparams[i + 1]).split("=")[1];
                if (pastValue != 0) str += `value="${pastValue}";`
            }
            str += `><img src="${products_array[i].image}" width="25%" height="25%">
                </section>
            `;
        }
        return str;
    }
});

// FROM Assignment1 MVC example

app.post("/purchase", function (request, response, next) {
    let POST = request.body;
    // console.log("\n" + JSON.stringify(POST));

    // Checking the POST response:
    // submit value wasn't correctly given
    if(typeof POST['purchase_submit'] == 'undefined') {
        response.send(`<h1>It appears you got to this page by mistake. Please return to the home page</h1>`)
        console.log('No purchase form data');
        next();
    }
    // All empty values will redirect back to the store page 
    let allEmpty = 0;
    for (let index = 0; index < products_array.length; index++) {
        if (POST[`quantity${index}`] === "") {
            allEmpty++;
        }
    }
    if (allEmpty === products_array.length) {
        console.log("All empty");
        response.redirect('/store');
        return next();
    }

    console.log(Date.now() + ': Purchase made from ip ' + request.ip + ' data: ' + JSON.stringify(POST));

    // Validate the quantities. If one quantity is invalid, return an error query with all of the quantities (for sticky purposes)
    let errorRedirectQuery = 'store?error=Invalid%20Quantity';
    let badQuantity = false;
    let overMax = false;
    for (i = 0; i < products_array.length; i++) {
        let quantityLeft = products_array[i].quantity_available - products_array[i].total_sold;
        if(typeof POST[`quantity${i}`] != 'undefined') {
            a_qty = Number(POST[`quantity${i}`]);
            errorRedirectQuery += "&quantity" + i + '=';
            if (!isNonNegativeInteger(a_qty)) {
                // Put error messages into this array to display error messages later
                quantities_errors[i] = isNonNegativeInteger(a_qty, true);
                badQuantity = true;
                errorRedirectQuery += a_qty;
            } else if (a_qty > quantityLeft){
                // Check that the desired quantity isn't over the max allowable
                quantities_errors[i] = ["Adjusted the quantity to the maximum allowable"];
                overMax = true;
                errorRedirectQuery += quantityLeft;
            } else {
                quantities_errors[i] = [];
                errorRedirectQuery += a_qty;
            }
        }
    }
    // If the quantities are invalid, redirect the user back to the store page
    if (badQuantity || overMax) {
        console.log("Something was bad about the quantities");
        console.log("quantities_errors: " + JSON.stringify(quantities_errors));
        errorRedirectQuery += "&badQuantity" + `=${badQuantity}`;
        errorRedirectQuery += "&overMax" + `=${overMax}`;
        response.redirect(errorRedirectQuery);
        return next();
    }

    var contents = fs.readFileSync('./views/invoice.template', 'utf8');
    response.send(eval('`' + contents + '`')); // render template string

    function display_invoice_table_rows() {
        subtotal = 0;
        str = '';
        for (i = 0; i < products_array.length; i++) {
            a_qty = 0;
            // Grab the quantity ordered if it's not undefined
            if(typeof POST[`quantity${i}`] != 'undefined') {
                a_qty = POST[`quantity${i}`];
            }
            // If the quantity ordered is greater than 0, calculate the product's extended price and add to the subtotal
            if (a_qty > 0) {
                // product row
                products_array[i]['total_sold'] += Number(a_qty);
                extended_price =a_qty * products_array[i].price
                subtotal += extended_price;
                str += (`
      <tr>
        <td width="43%">${products_array[i].flower}</td>
        <td align="center" width="11%">${a_qty}</td>
        <td width="13%">\$${(products_array[i].price).toFixed(2)}</td>
        <td width="54%">\$${(extended_price).toFixed(2)}</td>
      </tr>
      `);
            }
        }
        // Compute tax
        tax_rate = 0.0575;
        tax = tax_rate * subtotal;

        // Compute shipping
        if (subtotal <= 50) {
            shipping = 2;
        }
        else if (subtotal <= 100) {
            shipping = 5;
        }
        else {
            shipping = 0.05 * subtotal; // 5% of subtotal
        }

        // Compute grand total
        total = subtotal + tax + shipping;
        console.log("products_array after purchases: " + JSON.stringify(products_array));
        return str;
    }

});

// process purchase request (validate quantities, check quantity available)
/* <** your code here ***> */

// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));

// Functions:
// FROM lab 13
function isNonNegativeInteger(inputString, returnErrors = false) {
    // Validate than an input value is a non-negative integer
    // inputString is the input stringl returnErrors indicates how the function returns: true means return 
    // the array and false means return a boolean
    errors = []; // assume no errors at first
    if (Number(inputString) != inputString) {
        errors.push("Not a number!"); // Check if string is a number value
    } else {
        if (inputString < 0) {
            errors.push("Negative value!"); // Check if it is non-negative
        }
        if (parseInt(inputString) != inputString) {
            errors.push("Not an integer!"); // Check that it is an integer
        }
    }
    return returnErrors ? errors : (errors.length == 0)
}

// FROM lab 13
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

function checkQuantityTextbox(theTextbox) {
    errs = isNonNegInt(theTextbox.value, true);
    if (errs.length == 0) errs = ['You want:'];
    if (theTextbox.value.trim() == '') errs = ['Quantity'];
    document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(", ");
}