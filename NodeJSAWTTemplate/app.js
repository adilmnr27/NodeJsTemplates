/*------Start of the application--------*/
/*------Write 'npm install' to install all the dependencies-------------*/
/*------Start the application by the command 'node app.js'-------------------*/
/*------You can edit the port number by editing the const variable portNumber------*/


/*
*The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
*With strict mode, you can not, for example, use undeclared variables.
*/
"use strict"; 

// we will use the require function to load the module
const express = require('express') //express is the name of module which returns a function .
const app = express(); // object created of type Express
const portNumber = process.env.port || 8081; //if port has been specified in the environment it will pick up that number or else the port defined
const student = require('./routes/studentRoutes.js'); //getting the router object from studentRoutes
const teacher = require('./routes/teacherRoutes.js');// getting the router object from teacherRoutes
const bodyParser = require('body-parser');
const cors = require("cors"); //to solve the  cross-orgins problem.
//app.use(express.json()); // To convert the data coming into json.


// Enable CORS preflight across the board.
app.options("*", cors());
app.use(cors());

// Added headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


/*
*To learn how body parser works follow the below link:-
https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90 
*It is used for parsing json.
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


/* Methods which can be used
app.get();
app.post();
app.put();
app.delete();
*/

/*
*First app.get() has two arguments. 
*First argument is a url for the root of the website.
*Second argument is a call back function which has two argument 'req' and 'res'.
*So when the root of the url has been hit, the lambda callback function will be called and two paramters will be passed.
*/
app.get('/', (req, res) => {
    res.send("Hello World");
})


//Basically we are telling that, for the routes starting with the first argument url, use the second argument router.
app.use('/api/student', student);
app.use('/api/teacher', teacher);


//now for listening to the endpoints on a given port
/*
* First argument is the port on which you want the app to listen.
* Second argument is an optional parameter.
* The Second argument is a call back function which will be executed after the application starts listening on the desired port.
*/
app.listen(portNumber, () => {
    console.log("Application is running on port " + portNumber)
})