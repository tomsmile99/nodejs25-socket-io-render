// server.js หรือ app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// สร้าง Socket.IO พร้อม config CORS
const io = new Server(server, {
  cors: {
    origin: [
      "https://watershop25.tsmiledev.com",
      "http://127.0.0.1:3007"
    ],  // หรือ * ถ้าทดสอบ
    methods: ["GET", "POST"],
    credentials: true
  }
});
  
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.emit("hello", "สวัสดีจาก Server");

  socket.on("message", (msg) => {
    console.log("Received:", msg);
  });
});

// รับ API POST จาก CodeIgniter
app.post('/new-order', (req, res) => {
  io.emit('new-order');
  res.status(200).send('Order broadcasted');
});

app.post('/update-notfica', (req, res) => {
  io.emit('update-notfica');
  res.status(200).send('UpdateNotification');
});

app.post('/updatelv2-notfica', (req, res) => {
  io.emit('updatelv2-notfica');
  res.status(200).send('UpdateLv2 Notification');
});

server.listen(4002, () => {
  console.log("Socket.IO server running on port 4002");
});
