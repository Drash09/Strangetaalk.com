// const io = require('socket.io')(8000)
const io = require('socket.io')(8000, {
    cors: {
      origin: '*', 
    }
  });

const users = {};

io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log('new user',name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})
// Node Serever*********************************************************
const express = require('express');
const path = require('path');  
app = express();
const port = 3000;
app.use('/static',express.static('../static'));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'../')); 
app.get('/',(req,res)=>{
    res.status(200).render('home.pug'); 
})  
app.get('/call',(req,res)=>{
    res.status(200).render('call.pug'); 
}) 
app.get('/chat',(req,res)=>{
    res.status(200).render('chat.pug'); 
}) 
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug'); 
}) 
app.listen(port,()=>{
    console.log(`site is Running on http://localhost:${port}/`); 
}) 