var express = require('express');
var app = express();
var myParser = require("body-parser");

app.get('/', function(req,res) {
    res.send(
        `<form name='quantity_form' action="/process_form" method="POST">
            Name1: <input  name="name1"><br>
            Name2: <input  name="name1"><br>
            <input type="submit" name="Submit" value="Send POST Request">
        </form>`
        );
});

app.post('/process_form', function(req, res) {
    let POST = req;
    console.log(JSON.stringify(POST));
    /* if (typeof req.headers.body['Submit'] != undefined) {
        for (value in req.body) {
            if (value == "Tyler") {
                res.send("Found him!");
            } else {
                res.send("I couldn't find Tyler :(");
            }
        }
        
    } */
});

app.listen(8080, () => console.log(`listening on port 8080`));