var fs = require('fs');

var filename = "./user_data.json";

data = fs.readFileSync(filename, 'utf-8');

user_data = JSON.parse(data);
console.log("user_data: " + user_data);

user_data2 = require(filename);
console.log(user_data2);