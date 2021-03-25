
const AccountModel = require("../models/account");
const chatModel = require("../models/chat");

const express = require("express");
const router = express.Router();
// const mongodb = require("mongodb");


var add_chat = {
    post: (req, res) => {
            AccountModel.findOne({ email: req.cookies.email }, (err, cookies) => {
                AccountModel.findOne({ email: req.params.email }, (err, data) => {
                    // AccountModel.updateOne({ name: req.cookies.email }, {
                    //     // update database
                    //     $push: {
                    //         friend: {
                    //             email: req.params.email,
                              
                    //         }
                    //     }
                    // });
                    // AccountModel.updateOne({ email: req.cookies.email }, {
                    //     $push: {
                    //         friend: {
                    //             email: req.cookies.email,
                               
                    //         }
                    //     }
                    // });
                    let chat1 = {
                                    userSend: req.cookies.email,
                                    userReceive: req.params.email,
                                    message: []
                                }
                    chatModel.create(chat1); 
                    let chat2 = {
                                    userSend: req.params.email,
                                    userReceive: req.cookies.email,
                                    message: []
                                }
                    chatModel.create(chat2);
                       // send respond to client
                        res.send(`
                        <form action="/message/send_message/${req.cookies.email}/${req.params.email}" method="GET">
                            <button class="message">Message</button>
                        </form> 
                    <script>alert('Add chat box successfully !')</script>`)
                 })
        
              

            })
            
            // res.json('ok')
    },
}
module.exports = add_chat;