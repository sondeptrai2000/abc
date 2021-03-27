const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;
var fileModel = require('../models/file')

class guestController {
    
    //last piece
    allcontribution(req,res){
        let slug = req.params.slug;
        fileModel.find({slug:slug,status: "Pass"},function(err,result){
            if(err){
                console.log(err) }else{
                    fileModel.find({slug:slug,status2: "Pass"},function(err,result2){
                        if(err){
                            console.log(err) }else{
                            res.render('guest/baocuahocsinh',{data:result,data2:result2})
                        }
                    })          
            }
        })            
    }


    readcontribution(req,res){
                let id = req.params.id
                fileModel.find({_id:id},(err,data)=>{
                    if(err){
                        console.log(err)
                    }
                    else if(data.length>0){
                        res.render('guest/danhgia.ejs',{data:data})
                    }
                    else{
                        res.render('guest/danhgia.ejs',{data:data})
                    }
                })
    }
    addGuest (req,res){
        AccountModel.find(function(err,data){
            res.render('./guest/addGuest')    
    })
    }

    allGuest (req,res){
        AccountModel.find({role : "guest"},function(err,data){
            res.render('./guest/allGuest',{account:data})    
    })
    }
    
    doAddGuest(req,res){
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            
            
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(password, salt);
                    let newManager = AccountModel({
                        username,
                        password :hash,
                        email,
                        role :"guest"
                    })
                    newManager.save(function(err,data){
                        if(err){
                            console.log(err)
                        }else{
                            
                            res.redirect('/guest/allGuest/')
                        }
                    })
    }
    
    updateGuest(req,res){
        AccountModel.findById(req.params.id)
            .then(data=>
                res.render('guest/updateGuest',{account:data})
            )
    }
    deleteGuest (req,res){
        
            AccountModel.deleteOne({
                _id :  req.params.id
            })
            .then(()=>{
                res.redirect('/guest/allGuest/')
            })
        
        
        
    }
    doupdateGuest (req,res){
        AccountModel.updateOne({
            _id : req.params.id
        }, req.body)
        .then(()=>{
            res.redirect('/guest/allGuest/')
        })
    }
}
module.exports = new guestController;