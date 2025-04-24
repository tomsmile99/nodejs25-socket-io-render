// server.js หรือ app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// สร้าง Socket.IO พร้อม config CORS
const io = new Server(server, {
  cors: {
    origin: "https://watershop25.tsmiledev.com",  // หรือ * ถ้าทดสอบ
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

server.listen(4002, () => {
  console.log("Socket.IO server running on port 4002");
});
