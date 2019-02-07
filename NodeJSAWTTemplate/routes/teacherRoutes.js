/*-------------For Teacher Routes ie. routes which start with /api/teacher---------*/
"use strict"; 
const express = require('express');
const router = express.Router(); 

const jwt = require('jsonwebtoken'); //For token management
const teacher = require('../models/dummyTeacher');

//indirectly the url is portNumber:/api/teacher/login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username!==teacher.username && password!==teacher.password){
        console.log("incorrect credentials")
        res.send("please enter correct credentials");
    }
    
    res.send("Teacher logged in")

});

//indirectly the url is portNumber:/api/teacher/
router.get('/', (req, res) => {
    res.send("teacher view");
})


//Post Request
router.post('/signup',(req,res)=>{
    console.log(req.body);
    res.send("Your details are + " + JSON.stringify(req.body));
})


//exporting the router object so that we can import it in app.js
module.exports = router;