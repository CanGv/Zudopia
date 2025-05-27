const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Room = require("./models/Room"); 
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://zudopia.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("createRoom", async (_, callback) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase(); // örn: 6 karakterlik ID
    await Room.create({ roomId });
    socket.join(roomId);
    callback({ success: true, roomId });
  });

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", { userId: socket.id });
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});