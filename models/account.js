var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    username: String,
    password: String,
    email : String,
    slug: String,
    role : {
        type : String,
        default : "student"
    },
    deadline2: {
        type : String,
        default : ""
    },
    deadline: {
        type : String,
        default : ""
    },
    friend:[{
        email: String
    }],
    phone: String,
    address : String,
    birthday : Date,
},
{
    collection: 'account'
});

var AccountModel = mongoose.model('account', AccountSchema);
module.exports = AccountModel