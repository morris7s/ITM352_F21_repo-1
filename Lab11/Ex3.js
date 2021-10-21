var attributes = "<name>;<age>;<age + 0.5>;<0.5 - age>";

var pieces = attributes.split(";");

for (i = 0; i<pieces.length; i++) {
    console.log(pieces[i] + " is type of " + typeof(pieces[i]));
}

console.log("pieces is type of:" + typeof(pieces));

console.log(pieces.join(","));