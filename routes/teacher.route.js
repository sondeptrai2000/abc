var express = require('express');
var CourseModel = require('../models/course'); 
var teacherRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const teacherController = require('../controller/teacher.controller');

teacherRoute.get('/addTeacher',teacherController.addTeacher)
teacherRoute.post('/doAddTeacher', isEmail,teacherController.doAddTeacher)

teacherRoute.get('/update:id',teacherController.update)
teacherRoute.get('/delete:id',teacherController.deleteTeacher)


teacherRoute.post('/doupdate:id', teacherController.doupdate)

module.exports = teacherRoute