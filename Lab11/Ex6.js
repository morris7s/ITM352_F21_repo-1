var attributes = "5;-3,0;xxx;7.5;13";

var pieces = attributes.split(";");

function isNonNegativeInteger(inputString, returnErrors = false) {
    // Validate than an input value is a non-negative integer
    // inputString is the input stringl returnErrors indicates how the function returns: true means return 
    // the array and false means return a boolean
    errors = []; // assume no errors at first
    if(Number(inputString) != inputString) errors.push('Not a number!'); // Check if string is a number value
    if(inputString < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(inputString) != inputString) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0)
}

// callback function is being given the element and the index of the element
// Calls isNonNegativeInteger and prints result to console
// Could iterate over checkIt in a for loop, buut instead

// callback function check whether array elements are non-negative integers
function checkIt(elem, index) { 
    console.log(`${index}: ${elem} is ${(isNonNegativeInteger(elem) ? 'a' : 'not a')} valid quantity`);
}

//console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
// Apply checkIt to pieces array
pieces.forEach(checkIt);

console.log("=================")
// Anonymous function
pieces.forEach( (elem, index) => {console.log(`${index}: ${elem} is ${(isNonNegativeInteger(elem) ? 'a' : 'not a')} valid quantity`);})


// Create a function that takes an array of numbers, called monthly_sales (a list of monthly sales amounts), and a tax rate (tax_rate) as inputs. The function must return an array called tax_owing, which consists of one entry for every entry in monthly_sales indicating the tax owing for that entry.

function taxOwed (monthly_sales, tax_rate) {
    let tax_owing = [];
    for (let index = 0; index < monthly_sales.length; index++) {
        tax_owing.push(monthly_sales[index] * tax_rate);
    }
    return tax_owing;
}