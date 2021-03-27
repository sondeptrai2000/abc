var express = require('express');
var FaculityModel = require('../models/faculity'); 
var guestRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');
const guestController = require('../controller/guest.controller');

guestRoute.use('/uploads', express.static('uploads'));
guestRoute.use('/public', express.static('public'));
guestRoute.use(checkAuth);

//hiển thị các khoa 
guestRoute.get('/danhsachsvien:slug', guestController.allcontribution)
//xem các bài đăng từ các khoa 
guestRoute.get('/danhgiabaibao:id', guestController.readcontribution)
//crud
guestRoute.get('/addGuest',guestController.addGuest)
guestRoute.get('/allGuest',guestController.allGuest)

guestRoute.get('/update:id',guestController.updateGuest)
guestRoute.get('/delete:id',guestController.deleteGuest)
guestRoute.post('/doupdate:id', guestController.doupdateGuest)

guestRoute.post('/doAddGuest', isEmail,guestController.doAddGuest)
module.exports = guestRoute