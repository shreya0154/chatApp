const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
// const userAuth = require('./routes/auth.route')
const socket = require('socket.io')

const app = express()
require('dotenv').config()

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
const conn = mongoose.connection
conn.on("error", ()=>{
    console.log("error while connecting to DB")
})
conn.once("open", ()=>{
    console.log("connected to DB")
    // init();
})


// dono sahi hai bs yahan switch kro to correspondingly routes "auth.route" waale mein hi switch krna
// app.use('/chatapp/api/v1/auth', userAuth)
require('./routes/auth.route')(app);
require('./routes/avatar.route')(app);
console.log("calling users");
require('./routes/allUsers.route')(app);
require('./routes/messages.route')(app);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT ${process.env.PORT}`)
})


const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,

    }
})


global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data)=>{
        console.log("mg")
        console.log({data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    })
})