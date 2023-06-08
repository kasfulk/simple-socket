const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send({
    message: "Chat socket it's running"
  })
});

io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected.`);
  socket.on('chat', (data) => {
    socket.emit('chatResponse', data);
  })
  socket.on('disconnect',() => {
    console.log(`a user ${socket.id} disconnected.`)
  })
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});