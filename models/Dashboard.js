var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const DashboardSchema = new Schema({
    soHocsinhnopbai:  {
        type : String,
        default : "0"
    },
    tongbaidanop:  {
        type : String,
        default : "0"
    },
    sobaidapass:  {
        type : String,
        default : "0"
    },
    hocsinhcuakhoa:  {
        type : String,
        default : "0"
    },
    fail:  {
        type : String,
        default : "0"
    },

    slug: String
},
{
    collection: 'Dashboard'
});

var DashboardtModel = mongoose.model('Dashboard', DashboardSchema);
module.exports = DashboardtModel