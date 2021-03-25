
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
const mongodb = require("mongodb");
var fileModel = require('../models/file');
const chatModel = require('../models/chat');

class messtController {
    list(req,res){
        AccountModel.find({slug: req.params.slug,role: "student"})
        .then((data)=>{
            
            res.render('./message/list_mess',{account : data})
        })
    }
    listTeacher(req,res){
        AccountModel.find({slug: req.params.slug,role: "teacher"})
        .then((data)=>{
            
            res.render('./message/list_teacher',{account : data})
        })
    }
   
    detailTeacher(req, res){
        AccountModel.findOne({ email: req.cookies.email }, (err, cookies) => {
                AccountModel.findOne({ email: req.params.email }, (err, data) => {
                            var isFriend = true;
                            var isMessage = false;
                            chatModel.findOne( { $or:[ {'userSend':req.cookies.email,'userReceive':req.params.email}, 
                                                    {'userReceive':req.cookies.email,'userSend':req.params.email} ]}, 
                                function(err,kq){       
                                                
                            }).then(kq=>{
                                if(kq){
                                    isFriend = false
                                    isMessage = true
                                }             
                                res.render('./message/teacher',{
                                    data: data,
                                    cookies: cookies,
                                    isFriend: isFriend,
                                    isMessage: isMessage
                                })
                            })
                            
                        })
                    })        
            }

            detailStudent(req, res){
                AccountModel.findOne({ email: req.cookies.email }, (err, cookies) => {
                        AccountModel.findOne({ email: req.params.email }, (err, data) => {
                                    var isFriend = true;
                                    var isMessage = false;
                                    chatModel.findOne( { $or:[ {'userSend':req.cookies.email,'userReceive':req.params.email}, 
                                                            {'userReceive':req.cookies.email,'userSend':req.params.email} ]}, 
                                        function(err,kq){       
                                                        
                                    }).then(kq=>{
                                        if(kq){
                                            isFriend = false
                                            isMessage = true
                                        }             
                                        res.render('./message/allStudent',{
                                            data: data,
                                            cookies: cookies,
                                            isFriend: isFriend,
                                            isMessage: isMessage
                                        })
                                    })
                                    
                                })
                            })        
                    }        

            get1 (req, res)  {
                var query1 = {
                    userSend: req.params.cookiesemail,
                    userReceive: req.params.user
                }
                const MongoClient = mongodb.MongoClient;
                MongoClient.connect("mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test", (err, db) => {
                    let dbo = db.db("test");
                    // find user send
                    dbo.collection("account").findOne({ email: req.params.cookiesemail, role :"student" }, (err, cookiesemail) => {
                        if (err) console.log(err);
                        // find user receive
                        dbo.collection("account").findOne({ email: req.params.user }, (err, user) => {
                            // find chat
                            dbo.collection("chats").find({userSend:req.params.cookiesemail}).toArray((err,list)=>{
                                dbo.collection("chats").findOne(query1, (err, result) => {
                                    if (result) {
                                        res.render("chat.ejs", {
                                            cookiesemail: cookiesemail,
                                            user: user,
                                            data: result,
                                            // online: online,
                                            // list:list
                                        });
                                    } else {
                                        res.render("chat.ejs", {
                                            cookiesemail: cookiesemail,
                                            user: user,
                                            data: 0,
                                            // online: online,
                                            // list:list
                                        });
                                    }
                                });
                            });
                        });
                    })
                 
                })
            } 

            get2 (req, res)  {
                var query1 = {
                    userSend: req.params.cookiesemail,
                    userReceive: req.params.user
                }
                const MongoClient = mongodb.MongoClient;
                MongoClient.connect("mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test", (err, db) => {
                    let dbo = db.db("test");
                    // find user send
                    dbo.collection("account").findOne({ email: req.params.cookiesemail, role :"teacher" }, (err, cookiesemail) => {
                        if (err) console.log(err);
                        // find user receive
                        dbo.collection("account").findOne({ email: req.params.user }, (err, user) => {

                            // find chat
                            dbo.collection("chats").find({userSend:req.params.cookiesemail}).toArray((err,list)=>{
                                dbo.collection("chats").findOne(query1, (err, result) => {
                                    if (result) {
                                        res.render("chat1.ejs", {
                                            cookiesemail: cookiesemail,
                                            user: user,
                                            data: result,
                                            // online: online,
                                            // list:list
                                        });
                                    } else {
                                        res.render("chat1.ejs", {
                                            cookiesemail: cookiesemail,
                                            user: user,
                                            data: result,
                                            // online: online,
                                            // list:list
                                        });
                                    }
                                });
                            });
                        });
                    })
                 
                })
            } 
}
module.exports = new messtController;