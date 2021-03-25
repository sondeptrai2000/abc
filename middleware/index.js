// let { checkEmail} = require('../service/auth')
// let accountmodel = require('../models/account');
let AccountModel = require('../models/account');
var jwt = require('jsonwebtoken')
// let checkEmail = (email)=>{
//     return AccountModel.findOne({email:email})

// }
let isEmail = async (req,res,next)=>{
    try {
        // let user = await checkEmail(req.body.email) 
        let user = req.body.email;
        await AccountModel.findOne({
            email:user
        }).then(user=>{
            if(!user){
                next();
            }else{
                return res.status(400).json({
                    message : "email da ton tai",
                    status: 400,
                    error : true,
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })

    }
}

let checkLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await AccountModel.findOne({
            email:user
        })
        // let user = await checkEmail(req.body.email)
        .then(user=>{
            if(!user){
                return res.status(400).json({
                    message : "sai mail",
                    status: 400,
                    error : true,

                })
            }else{
                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}

let getUserById = function getUserById(id){
    return AccountModel.findOne({_id:id})
}
let checkAuth = async (req,res,next)=>{
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getUserById(decodeAccount._id)
        if(user){
            req.userLocal = user;
            next();
        }else{
            return res.status(400).json({
                message : "tk k ton tai",
                status: 400,
                error : true,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        res.redirect('/login'))
    }
}

let checkAdmin = (req,res,next)=>{
    if (req.userLocal.role === "admin"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}
let checkTeacher = (req,res,next)=>{
    if (req.userLocal.role === "teacher"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}
let checkStudent = (req,res,next)=>{
    if (req.userLocal.role === "student"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}
module.exports ={
    isEmail,
    checkLogin,
    checkAdmin,
    checkAuth,
    getUserById,
    checkTeacher,
    checkStudent
}