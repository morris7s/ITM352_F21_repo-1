var express = require('express');
var app = express();

app.all('*', function (request, response, next) { // For all request types (GET and POST), respond to any path that matches this first parameter (* means everything) by executing this arrow function
    console.log(request.method + ' to path ' + request.path);
    next();
    console.log("1");
});

app.get('/test', function (request, response, next) { // For GET request types
    response.send("Got a GET request to path: test");
    console.log("2");
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here, when you're listening, exectue the arrow function

// next says execute the next path that matches the request; lets you move to the next rule