
// Put the amount in pennies
let amount = 10; 
let leftover = amount;
// Determine the number of quarters
let quarters = Math.floor(amount / 25);
leftover = leftover % 25; 

// Determine the number of dimes
let dimes = Math.floor(leftover / 10);
leftover = leftover % 10; 

// Determine the number of nickels
let nickels = Math.floor(leftover / 5);
leftover = leftover % 5; 

// Determine the number of pennies
let pennies = leftover;

console.log(amount + " pennies can be divided into: " + quarters + " quarter(s), " + dimes + " dime(s), " + nickels + " nickel(s), and " + pennies + " pennie(s).");