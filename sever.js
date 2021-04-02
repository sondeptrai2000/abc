const express = require("express");
const app = express();

var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var path = require('path');
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

var fileModel =require('./models/file')
var fileRouter = require('./routes/file.route')
const AccountModel = require('./models/account');

app.set('views','./views');
app.set('view engine','hbs');
app.set('view-engine', 'ejs');
app.use(cookieParser())

app.get('/logout', function (req, res, next) {
    res.clearCookie("token");
    res.clearCookie("id");
    res.clearCookie("slug");
    res.clearCookie("email");
    res.clearCookie("deadline");
    res.clearCookie("_cfduid");
    res.redirect('/')
});
var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));

var AccountRoutes = require('./routes/account.route')
var faculityRoute = require('./routes/faculity.route')
var indexrouter = require('./routes/index.route')
var studentRoute = require('./routes/student.route')
var teacherRoute = require('./routes/teacher.route')
var guestRoutes = require('./routes/guest.route')
var manageRoutes = require('./routes/manage.route')
var messRoutes = require('./routes/mess.route')



app.use('/guest', guestRoutes);
app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);
app.use('/account', AccountRoutes);
app.use('/faculity',faculityRoute);
app.use('/',indexrouter);
app.use('/file',fileRouter)
app.use('/manage',manageRoutes)
app.use('/message', messRoutes);




// var path = require('path');
// var duongDanPublic = path.resolve(__dirname,'public')
// app.use(express.static(duongDanPublic));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use('/views', express.static(path.join(__dirname,'views')))


app.get('/download/:id',(req,res)=>{
  fileModel.find({_id:req.params.id},(err,data)=>{
       if(err){
           console.log(err)
       }
       else{
           var x= __dirname+'/public/'+data[0].filePathdoc;
           
           console.log(x)
           res.download(x)
       }
  })
})
app.get('/download2/:id',(req,res)=>{
    fileModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var x= __dirname+'/public/'+data[0].filePathdoc2;
             
             console.log(x)
             res.download(x)
         }
    })
  })


  app.get('/validate',(req,res)=>{
   res.render("pie")
  })

  app.get('/validate1',(req,res)=>{
    res.json('ok')
   })

//tiến hành cài đặt cho chat box
const http = require('http');
const socketio = require('socket.io');
// const formatMessage = require('./utils/messages');
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers
// } = require('./utils/users');
// // var AccountRoute = require('./routers/account.route')

const server = http.createServer(app);
const io = socketio(server);

// // Set static folder
// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use('chat', AccountRoute);
// const botName = 'ChatCord Bot';

// // Run when client connects
// io.on('connection', socket => {
//   socket.on('joinRoom', ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Send users and room info
//     io.to(user.room).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room)
//     });
//   });

//   // Listen for chatMessage
//   socket.on('chatMessage', msg => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit('message', formatMessage(user.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         // formatMessage(botName, `${user.username} has left the chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit('roomUsers', {
//         room: user.room,
//         users: getRoomUsers(user.room)
//       });
//     }
//   });
// });
//real-time in chat
io.on("connection", (socket) => {
  socket.on("new_user_message", (data) => {
      socket.join(`${data.cookiesemail}and${data.user}`);
      socket.join(`${data.user}and${data.cookiesemail}`);
      var query1 = {
          userSend: data.cookiesemail,
          userReceive: data.user,
      }
      var query2 = {
          userSend: data.user,
          userReceive: data.cookiesemail,
      }
      //typing
      socket.on("typing",data=>{
          socket.to(`${query1.userReceive}and${query1.userSend}`).emit("typing_server", data);
      })
      socket.on("done_typing", ()=>{
          socket.to(`${query1.userReceive}and${query1.userSend}`).emit("done");
      });
      socket.on("stop_typing",()=>{
          socket.to(`${query1.userReceive}and${query1.userSend}`).emit("stop_typing_server");
      })
      // event listen client send text
      socket.on("client_send_mes", data => {
          //check link text
          var index = data.mes.indexOf("https://");
          if(index!=-1){     
              var link = data.mes.slice(index, data.mes.length);
              // handle link text
             (async()=>{
                const preview = await link_preview.getPreview(link);
                socket.to(`${data.cookiesemail}and${data.User}`).to(`${data.User}and${data.cookiesemail}`).emit("server_send_mes", {
                  message: data.mes,
                  from: data.cookiesemail,
                  Time_Mes: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                  link:preview
              });
             })();
          } else{
              socket.to(`${data.cookiesemail}and${data.User}`).to(`${data.User}and${data.cookiesemail}`).emit("server_send_mes", {
                  message: data.mes,
                  from: data.cookiesemail,
                  Time_Mes: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                  link:0
              });
          }
          MongoClient.connect('mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test', (err, db) => {
              let dbo = db.db("test");
              dbo.collection("chats").updateOne(query1, {
                  "$push": {
                      message: {
                          check: 1,
                          Mes: `${data.mes}`,
                          index_time:new Date().valueOf(),
                          date: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                          file_name: ""
                      }
                  }
              });
              dbo.collection("chats").updateOne(query2, {
                  "$push": {
                      message: {
                          check: 0,
                          Mes: `${data.mes}`,
                          index_time:new Date().valueOf(),
                          date: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                          file_name: ""                            
                      }
                  }
              });
          });
      }); 
      // event listen client send file
      socket.on("client_send_file_mes", (data) => {
          console.log("ok")
          console.log(data)
          var length = data.file_name.length;
          var dot = data.file_name.indexOf(".");
          // var type = data.file_name.substr(length - 3, 3);
          var type=data.file_name.slice(dot+1,length);
          MongoClient.connect('mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test', (err, db) => {
              let dbo = db.db("test");
              dbo.collection("chats").updateOne(query1, {
                  "$push": {
                      message: {
                          check: 1,
                          Mes: `${data.mes}`,
                          index_time:new Date().valueOf(),
                          date: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                          file_name: data.file_name,
                          type: type
                      }
                  }
              });
              dbo.collection("chats").updateOne(query2, {
                  "$push": {
                      message: {
                          check: 0,
                          Mes: `${data.mes}`,
                          index_time:new Date().valueOf(),
                          date: `${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                          file_name: data.file_name,
                          type: type                        
                      }
                  }
              })
          });       
          socket.to(`${data.cookiesemail}and${data.User}`).to(`${data.User}and${data.cookiesemail}`).emit("server_send_file_mes", {
              message: data.mes,
              from: data.cookiesemail,
              file_name: data.file_name,
              type: type
          });
      });
      socket.on('check-seen',(data)=>{
          socket.to(`${data.cookiesemail}and${data.User}`).emit("check-seen-sv");
      })
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


