const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

mongoose
  .connect(process.env.MONGO_CONNECT_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port:", process.env.PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    for (var i = 0; i < data.to.length; i++) {
      if (data.to[i].userId !== data.from.userId) {
        const sendUserSocket = onlineUsers.get(data.to[i].userId);
        // console.log(onlineUsers);
        if (sendUserSocket) {
          const dataSent = {
            message: data.message,
            from: data.from,
          };
          io.to(`${sendUserSocket}`).emit("msg-receive", dataSent);
        }
      }
    }
  });
  socket.on("send-invitation", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(`${sendUserSocket}`).emit("invitation-receive", data.from);
    }
  });
  socket.on("acceptted", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(`${sendUserSocket}`).emit("response-accept-friend", data);
    }
  });
  socket.on("denyAddFriend", (data) => {
    const sendUserSocket = onlineUsers.get(data.to._id);
    if (sendUserSocket) {
      io.to(`${sendUserSocket}`).emit("response-deny-invitation", data);
    }
  });
});
