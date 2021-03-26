// var accountmodel = require('../models/account')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// let signUp = function(inforUser){
//     let {username, password, email} = inforUser;
//     if(username && password){
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hash = bcrypt.hashSync(password, salt);
//         return accountmodel.create({
//             username,
//             password :hash,
//             email
//         });
//     }else{
//         throw "error"
//     }
// }

// let checkEmail = (email)=>{
//     return accountmodel.findOne({email:email})

// }

// module.exports = {
//     // signUp,
//     checkEmail
// }