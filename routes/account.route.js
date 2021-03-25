var express = require('express');
var router = express.Router();
var {signUpController, loginController,indexAdmin,indexTeacher, indexStudent,indexManager,indexGuest} = require('../controller/account.controller');
const {checkAuth, isEmail , checkAdmin,checkLogin,checkTeacher} = require('../middleware/index');
router.post('/sign-up', isEmail, signUpController)
router.post('/dologin', checkLogin, loginController)
router.get('/indexAdmin',checkAuth ,checkAdmin, indexAdmin)
router.get('/indexTeacher',checkAuth ,checkTeacher, indexTeacher)
router.get('/indexStudent',checkAuth , indexStudent)
router.get('/indexGuest',indexGuest)
router.get('/indexManager',indexManager)
module.exports = router
