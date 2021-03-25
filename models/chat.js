var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var chatSchema= new mongoose.Schema({
    userSend: String,
    userReceive: String,
    message:[{type: String}]
})

var chatModel = mongoose.model('chat',chatSchema);

module.exports = chatModel