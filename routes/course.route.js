var express = require('express');
var CourseModel = require('../models/course'); 
var courseRoute = express.Router();
let {checkAuth,checkAdmin,checkTeacher } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const courseController = require('../controller/course.controller');


// tương tác với course
courseRoute.get('/allcourse', courseController.allcourse)
courseRoute.get('/course/:slug', courseController.detail)

courseRoute.post('/course/search', courseController.search)
courseRoute.get('/allStudent/:slug/',courseController.allstudent,)
courseRoute.get('/Teacher/:slug',courseController.teacher)

courseRoute.use(checkAuth);
courseRoute.get('/view:slug', checkTeacher,courseController.viewmanagine)
courseRoute.get('/evaluate/:id', checkTeacher,courseController.danhgiabaibao)
courseRoute.get('/allDocument/:email',checkTeacher ,courseController.allDocument)

courseRoute.post('/dodanhgiabaibao:id', checkTeacher,courseController.dodanhgiabaibao)

courseRoute.post('/rate2:id', checkTeacher,courseController.rate2)
courseRoute.get('/evaluate2nd/:id', checkTeacher,courseController.danhgiabaibao2nd)

courseRoute.use(checkAdmin);

//sơn test|


courseRoute.use('/uploads', express.static('uploads'));
courseRoute.use('/public', express.static('public'));



courseRoute.get('/course/update/:id',courseController.update)
courseRoute.get('/create',courseController.create)
courseRoute.get('/course/delete/:id',courseController.delete)


courseRoute.post('/doupdate:id', courseController.doupdate)
courseRoute.post('/doCreate', courseController.docreate)


// tương tác với học sinh
// courseRoute.get('/course/addStudent',courseController.addStudent)

// courseRoute.post('/course/doAddStudent', isEmail,courseController.doAddStudent)

module.exports = courseRoute;