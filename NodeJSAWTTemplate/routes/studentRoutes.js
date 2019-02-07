/*-------------For Student Routes ie. routes which start with /api/student---------*/
"use strict";
const express = require('express')
const router = express.Router();

const jwt = require('jsonwebtoken'); //For token management
const student = require('../models/dummyStudent');

//indirectly the url is portNumber:/api/student/login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username !== student.username && password !== student.password) {
        console.log("incorrect credentials")
        res.send("please enter correct credentials");
    }
    //User authenticated. Now we will create awt token
    else {

        //creating a separate user object for payload as we cannot pass sensitive info as payload
        const user = {
            username: student.username,
            role: student.role,
            firstname: student.firstName
        }

        jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
            if (err) { console.log(err) }
            res.send(token);
        });
    }
});

//indirectly the url is portNumber:/api/student/
router.get('/', (req, res) => {
    res.send("student view");
})

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


//This is a protected route 
router.get('/data', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            console.log(authorizedData.user.role);
            if (authorizedData.user.role !== "student") {
                res.send("Authenticated but not authorized")
            }
            else {
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
        }
    })
});



//exporting the router object so that we can import it in app.js
module.exports = router;