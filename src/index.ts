// src/index.js
import express, { Express, Request, Response } from "express";
import http from "http";
var cors = require('cors')
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5500;

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is running.")
})

io.on("connection", (socket: Socket) => {
  socket.emit("me", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("cancelled")
  })

  socket.on("call-user", ({ userToCall, signal, from, name }) => {
    io.to(userToCall).emit("call-user", { signal, from, name })
  })

  socket.on("answer-call", ({ signal, to }: any) => {
    io.to(to).emit("call-accepted", signal)
  })
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});