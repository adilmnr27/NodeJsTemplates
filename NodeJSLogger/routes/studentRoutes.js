/*-------------For Student Routes ie. routes which start with /api/student---------*/
"use strict";
const express = require('express')
const router = express.Router();

//indirectly the url is portNumber:/api/student/login
router.get('/login', (req, res) => {
    res.send("Student logged in")
});

//indirectly the url is portNumber:/api/student/
router.get('/', (req, res) => {
    res.send("student view");
})

//exporting the router object so that we can import it in app.js
module.exports = router;