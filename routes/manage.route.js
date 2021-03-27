var express = require('express');
var FaculityModel = require('../models/faculity'); 
var manageRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
// const { isEmail } = require('../middleware/index');
const manageController = require('../controller/manager.controller');
const { isEmail } = require('../middleware/index');

manageRoute.use('/uploads', express.static('uploads'));
manageRoute.use('/public', express.static('public'));
manageRoute.use(checkAuth);

//cài đặt dealine nộp bài
manageRoute.post('/settime', manageController.settime)

//xem bài báo
manageRoute.get('/allfaculity', manageController.allfaculity)
manageRoute.get('/allcontribution:slug', manageController.allcontribution)
manageRoute.get('/viewStatistical:slug', manageController.allstatistical)
manageRoute.get('/Statistical:slug', manageController.statistical)


manageRoute.get('/readcontribution:id', manageController.readcontribution)

//downloadfilezip
manageRoute.get('/allfaculitymanager', manageController.allfaculitymanager)
// CRUD
manageRoute.get('/addManager',manageController.addManager)
manageRoute.get('/allManager',manageController.allManager)

manageRoute.get('/update:id',manageController.updateManager)
manageRoute.get('/delete:id',manageController.deleteManager)
manageRoute.post('/doupdate:id', manageController.doupdateManager)

manageRoute.post('/doAddManager', isEmail,manageController.doAddManager)

module.exports = manageRoute    