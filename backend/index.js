const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const socket = require("socket.io");

const Messages = require("./models/messageModel");

const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, req.method, req.query.name);
  next();
});

app.use("/api/auth", userRoutes);

// app.use("/", (req, res) => {
//   res.send("Api is working ");
// });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const io = socket(server, {
  cors: {
    origin: "http://192.168.232.208:3000",
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
    console.log("send-msg", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      let message = saveMessages(data);
      // console.log(message);
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
});

const saveMessages = async (data) => {
  try {
    let message = await Messages.create({
      message: {
        text: data.message.text,
      },
      sender: data.from,
      to: data.to,
    });
    // console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
};
