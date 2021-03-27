var express = require('express');
var FaculityModel = require('../models/faculity'); 
var faculityRoute = express.Router();
let {checkAuth,checkAdmin,checkTeacher } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const faculityController = require('../controller/faculity.controller');


// tương tác với faculity
faculityRoute.get('/allfaculity', faculityController.allfaculity)
faculityRoute.get('/faculity/:slug', faculityController.detail)

faculityRoute.post('/faculity/search', faculityController.search)
faculityRoute.get('/allStudent/:slug/',faculityController.allstudent,)
faculityRoute.get('/Teacher/:slug',faculityController.teacher)

faculityRoute.use(checkAuth);
faculityRoute.get('/view:slug', checkTeacher,faculityController.viewmanagine)
faculityRoute.get('/evaluate/:id', checkTeacher,faculityController.danhgiabaibao)
faculityRoute.get('/allDocument/:email',checkTeacher ,faculityController.allDocument)

faculityRoute.post('/dodanhgiabaibao:id', checkTeacher,faculityController.dodanhgiabaibao)

faculityRoute.post('/rate2:id', checkTeacher,faculityController.rate2)
faculityRoute.get('/evaluate2nd/:id', checkTeacher,faculityController.danhgiabaibao2nd)

faculityRoute.use(checkAdmin);

//sơn test|


faculityRoute.use('/uploads', express.static('uploads'));
faculityRoute.use('/public', express.static('public'));



faculityRoute.get('/faculity/update/:id',faculityController.update)
faculityRoute.get('/create',faculityController.create)
faculityRoute.get('/faculity/delete/:id',faculityController.delete)


faculityRoute.post('/doupdate:id', faculityController.doupdate)
faculityRoute.post('/doCreate', faculityController.docreate)


// tương tác với học sinh
// faculityRoute.get('/faculity/addStudent',faculityController.addStudent)

// faculityRoute.post('/faculity/doAddStudent', isEmail,faculityController.doAddStudent)

module.exports = faculityRoute;