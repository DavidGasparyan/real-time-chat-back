const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const port = 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

app.get('/', (req, res) => {
  res.send({
    message: 'app works!',
  });
});

io.on("connection", (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message-broadcast', msg);
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})