/* a. (6 minutes) Implement the above algorithm using expressions and operators to determine the day of the week you were born on and list that day here. Implement each step and the calculations you used as a series of variables $step1, $step2, etc. Use node -i to perform the calculations and print out the results you need along the way. For example, using the date 8/3/2013 in the flowchart you might perform the following steps in node:

step1=13;
step2=parseInt(step1/4);
step3 = step2 + step1;
step4 = 2; // Not Jan, so look at month before on table
step6 = step4 + step3;
... 
Hint: parseInt() will take a float and drop the decimal part which would be dropping the remainder of division. Alternatively you can use Math.floor() to round-down to the nearest integer value. You can get the remainder and forget the quotient after dividing by using the modulus operator %. */

let date = "11/11/2001";

// Step 1
dateParts = date.split("/")[2];
let step1 = parseInt(dateParts.slice(2,4));

// Step 2
let step2 = Math.floor(parseInt(step1)/4);
// Step 3
let step3 = parseInt(step1) + step2;
console.log(step3);

let step4 = 3; // Not jan so look at month before on table

let step6 = step4 + step3;

let step7 = step6 + parseInt(date.split("/")[1]);
console.log(step7);

let step8 = step7;

// year 2000s
// not a leap year
finalTotal = step8 - 1;

let result = null; 
if (finalTotal > 7) {
    result = finalTotal % 7;
}

console.log(result); // I get 0 which is Sunday which is correct
