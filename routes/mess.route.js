var express = require('express');
var FaculityModel = require('../models/faculity'); 
var messRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');
const messController = require('../controller/mess.controller');
const add_chat = require('../controller/add_chat');




messRoute.get('/:slug', messController.list)
messRoute.get('/teacher/:slug', messController.listTeacher)

messRoute.get('/all/:email', messController.detailTeacher)
messRoute.get('/allStudent/:email', messController.detailStudent)

messRoute.get("/send_messageTeacher/:cookiesemail/:user", messController.get1);
messRoute.get("/send_message/:cookiesemail/:user", messController.get2);


messRoute.post("/send_message/:cookiesemail/:user/up_file", async (req,res)=>{
    await res.redirect('back');
});

messRoute.post('/add_chat/:email', add_chat.post);

module.exports = messRoute