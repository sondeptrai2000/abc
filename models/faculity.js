var mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;
const FaculitySchema = new Schema({ 
    faculityname : String,
    topic : String,
    slug: String,
    deadline:String,
    deadline2:String,
  
},{
    collection : 'faculity',
    timestamps : true
});

var FaculityModel = mongoose.model('faculity', FaculitySchema)
module.exports = FaculityModel