let express = require('express')
let app = express(); 
let http = require('http');
let server = http.Server(app); 
let socketIO = require('socket.io');
let io = socketIO(server,{
    cors: {
        origin: ["http://localhost:4200","http://3.109.113.141:80"],
        methods: ["GET", "POST"]
      }
}); 
const cors = require("cors");
 

const port =   5000; 
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('new-message', (message) => {
        console.log(message); 
        var r = "";
        r = message.id+"ROOM";
        console.log('Sending msg to Room : ' + r);
        socket.join(r);
        io.to(r).emit('message', message);
      });


    socket.on('disconnect', () => {
        console.log('user disconnected');
      });



      socket.on('room', async function(roomname) {
        let room = roomname+"ROOM";
      socket.join(room);
      console.log('user in room : ' + room); 
      console.log(socket.rooms);
      //const clients = await io.in(room).allSockets();
      //console.log(clients); 
      console.log(io.of("/").sockets.size);
  });
  socket.on('Leave_room', async function(roomname) {
      let room = roomname+"ROOM";
    socket.leave(room);
    console.log('left room : ' + room); 
    console.log(socket.rooms);
    //const clients = await io.in(room).allSockets();
    //console.log(clients); 
    console.log(io.of("/").sockets.size);
});
    

    
});
