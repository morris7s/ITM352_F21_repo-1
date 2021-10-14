require("./products_data.js");

var num_products = 5;

var count = 0;
while (count < num_products) {
    count++;
    if (count > num_products/4 && count <= (num_products/4) * 3) {
        console.log(`${count}. ${eval('name' + count)} is sold out!`);
        continue;
    }
    console.log(`${count}. ${eval('name' + count)}`);
}
console.log("That's all we have!");


// var num_products = 5;

for (let count = 1; count < (num_products + 1); count++) {
    if (count > num_products / 4 && count <= (num_products / 4) * 3) {
        console.log(`${count}. ${eval('name' + count) + " is sold out!"}`);
        continue;
    }
    console.log(`${count}. ${eval('name' + count)}`);
}
console.log("That's all we have!");
