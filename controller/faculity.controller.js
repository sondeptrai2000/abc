const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var DashboardtModel = require('../models/Dashboard')
var fileModel = require('../models/file');
const { findById } = require('../models/faculity');

class FaculityController {
    
    create(req,res){
        res.render('./faculity/create')
    }

    detail(req,res){
        let slug = req.params.slug;

        FaculityModel.find({
            slug : slug
        })
        .then(data=>{
            console.log(data)
            res.render('./faculity/detail',{faculity:data})
        })
        
    }

    allfaculity(req,res ){
        FaculityModel.find({

        })
        .then(data=>{
            res.render('./faculity/faculity',{faculity: data})
        })
        .catch(err=>{
            res.json("loi sever")
        })
    }

    search(req,res){
        var faculityname = req.body.faculityname;
        var topic = req.body.topic;
        FaculityModel.find({
            faculityname : faculityname,   
        })
        .then(data=>{
            res.render('./faculity/faculity',{faculity:data})
        })
    }

    create(req,res,next){
        res.render('./faculity/create')
    }

    update(req,res){
        FaculityModel.findById(req.params.id)
        .then(data=>
            res.render('./faculity/update',{faculity:data})
        )
    }

    docreate(req,res){
        var faculitynme = req.body.faculityname

        var newFaculity = FaculityModel({
            faculityname : faculitynme,
            topic : req.body.topic,
            slug: req.body.slug,

            student: []
        })
    
        newFaculity.save(function(err){
            if(err){
                console.log(err)
            }else{
                var newDashboard = DashboardtModel({
                    slug:req.body.slug
                })
                newDashboard.save(function(err){
                    res.redirect('/faculity/allfaculity')
                })
                // res.redirect('/faculity/allfaculity')
            }
        })
    }

    doupdate(req,res){
        // var id1 = req.params.id
        FaculityModel.updateOne({
            _id : req.params.id
        }, req.body)
        .then(()=>{
            res.redirect('/faculity/allfaculity')
        })
    }

    delete(req,res){
        FaculityModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/allfaculity')
        })
    }

    addStudent(req,res){
    //     FaculityModel.find(function(err,data){
    //         res.render('./student/faculity_student',{faculity:data})    
    // })
    res.render('./student/faculity_student',{faculity:data})    
    }

    doAddStudent(req,res){
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let slug = req.body.slug;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            let newStudent = AccountModel({
                username,
                password :hash,
                email,
                slug  
            })
            newStudent.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                res.render('./student/faculity_student')
            }
            })
    }

    allstudent(req,res){
            // FaculityModel.find({faculityname:req.params.slug})
            AccountModel.find({
                slug: req.params.slug,
                'role' :'student'
            })
            .then(data=>{
            res.render('./student/allstudent', {account:data})
            })  
        

    }

    teacher(req,res){ 
        AccountModel.find({
            slug: req.params.slug,
            role :'teacher'
        })
        .then(data=>{
        res.render('./teacher/teacher_profile', {teacher:data})
    })  
}

           
    //sơn test|
    viewmanagine(req,res){
        let slug = req.params.slug
        AccountModel.find({slug:slug,role:"student"},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('./faculity/baocuahocsinh',{account:data})
        }
        else{
            res.render('./faculity/baocuahocsinh',{account:data})
        }
        })
    }

    allDocument(req,res){
        fileModel.find({
            studentemail : req.params.email
        }).then(data=>{
            res.render('./file/allDocument.ejs',{file : data})
        })
    }
        
    danhgiabaibao(req,res){
        let id = req.params.id
        fileModel.find({_id:id},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('faculity/danhgia.ejs',{data:data})
        }
        else{
            res.render('faculity/danhgia.ejs',{data:data})
        }
        })
    }

    dodanhgiabaibao(req,res){
        let id = req.params.id
        let status = req.body.status
        let comment = req.body.comment
        fileModel.findById({_id :id},function(err,data){
            let studentemail = data.studentemail
            console.log(studentemail)
        fileModel.updateOne(
            { _id: id },   // Query parameter
            {                     // Replacement document
                status: status,
                comment: comment
            })
            .then(()=>{
                res.redirect('/faculity/allDocument/' + studentemail)
            })
        })
    }

    danhgiabaibao2nd(req,res){
        let id = req.params.id
        fileModel.find({_id:id},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('faculity/danhgia2nd.ejs',{data:data})
        }
        else{
            res.render('faculity/danhgia2nd.ejs',{data:data})
        }
        })
    }


    rate2(req,res){
        let id = req.params.id
        let status2 = req.body.status
        let comment2 = req.body.comment
        fileModel.findById({_id :id},function(err,data){
            let studentemail = data.studentemail            
        fileModel.updateOne(
            { _id: id },   // Query parameter
            {                     // Replacement document
                status2: status2,
                comment2: comment2
            })
            .then(()=>{
                res.redirect('/faculity/allDocument/' + studentemail)
            })
        })
    }
}
module.exports = new FaculityController;