const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;


let addTeacher = (req,res)=>{
    FaculityModel.find(function(err,data){
        res.render('./teacher/faculity_teacher',{faculity:data})    
})
}

let doAddTeacher=(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let slug = req.body.slug;
        let role = req.body.role
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                let newStudent = AccountModel({
                    username,
                    password :hash,
                    email,
                    slug,
                    role : "teacher"
                })
                newStudent.save(function(err,data){
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/faculity/Teacher/'+req.body.slug)

                        
                    }
    })
}

let update =(req,res)=>{
    AccountModel.findById(req.params.id)
        .then(data=>
            res.render('teacher/updateTeacher',{account:data})
        )
}
let deleteTeacher = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let slug = data.slug
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/Teacher/'+ slug)
        })
    })
    
    
}
let doupdate =(req,res)=>{
    
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.redirect('/faculity/Teacher/'+ req.body.slug)
    })
}

module.exports ={
    addTeacher,
    doAddTeacher,
    doupdate,
    deleteTeacher,
    update

}