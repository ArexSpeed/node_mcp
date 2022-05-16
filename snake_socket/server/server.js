const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Server running</h1>');
});

io.on('connection', client => {
  client.emit('init', { data: 'hello world' });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
