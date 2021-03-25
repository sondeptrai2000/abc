var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var picSchema= new mongoose.Schema({
    filePathdoc:String,
    filePath:String,
    nameFile : String,
    studentemail: String,
    status: {
        type : String,
        default : "not rate"
    },
    comment: {
        type : String,
        default : ""
    },
    slug :String,
    filePathdoc2:String,
    filePath2:String,
    nameFile2 : String,
    status2: {
        type : String,
        default : "not rate"
    },
    comment2: {
        type : String,
        default : ""
    },
    filePathAnh: String,
    filePathAnh2: String,

})

var picModel = mongoose.model('file',picSchema);

module.exports = picModel
