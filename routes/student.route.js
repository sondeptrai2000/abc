var express = require('express');
var CourseModel = require('../models/course'); 
var studentRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const studentController = require('../controller/student.controller');

studentRoute.get('/addStudent',studentController.addStudent)
studentRoute.post('/doAddStudent', isEmail,studentController.doAddStudent)

studentRoute.get('/update:id',studentController.update)
studentRoute.get('/delete:id',studentController.deleteStudent)


studentRoute.post('/doupdate:id', studentController.doupdate)


/// test
studentRoute.get('/chat/:id',studentController.chat)
// studentRoute.post('/doupdate:id', studentController.doupdate)

module.exports = studentRoute