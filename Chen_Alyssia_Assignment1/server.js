/* 
 * A file to serve products data, display products page, validate purchase data, and provide an invoice for a purchase
 */

var express = require('express');
var app = express();

var products_array = require('./products.json');

// For any internal requests from client side pages for the data
app.get("/product.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products_array)};`;
    console.log("In request for data");
    response.send(products_str);
});

// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// process purchase request (validate quantities, check quantity available)
/* <** your code here ***> */

// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));
