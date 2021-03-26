var express = require('express');
var indexrouter = express.Router();
let {getUserById} = require('../middleware/index')
var jwt = require("jsonwebtoken")
var AccountModel = require('../models/account')

indexrouter.get('/' ,(req,res,next)=>{
    res.render('login.hbs')
})

indexrouter.get('/home',async function (req,res){
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getUserById(decodeAccount._id)
        if(user.role === "admin"){
            return res.render("home/homeAdmin")
        }
        if(user.role === "student"){
            return res.render("home/homeStudent")
        }
        if(user.role === "teacher"){
            return res.render("home/homeTeacher")
        }
        
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        )
    }
})
module.exports = indexrouter