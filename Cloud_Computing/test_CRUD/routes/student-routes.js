const express = require('express');
const {addStudent} = require("../controllers/studentsController");

const router = express.Router();

router.post('/student', addStudent);

module.exports = {
    routes: router
}
