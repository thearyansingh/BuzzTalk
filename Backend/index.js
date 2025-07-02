import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongodbConnect from "./config/mongodb.js";
import { UserRouter } from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import { messageRouter } from "./Routes/MessageRoute.js";
// import { server } from "./Socket/SocketHandler.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config({});
//App Config
const app = express();
const port = process.env.PORT || 4000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//middleWares

const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use(cookieParser());

// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// api endpoints

app.use("/api/user", UserRouter);
app.use("/api/message", messageRouter);

export const getReceiverSocketId=(receiverId)=>{
  return userSocketMap[receiverId];
}

const userSocketMap = {}; // to bring the active userId
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
  const userId = socket.handshake.query.userId; // to take the userId
  console.log(userId)
  if (userId!==undefined) {
    userSocketMap[userId] = socket.id; // add the userId in map object
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
server.listen(port, () => {
  mongodbConnect();
  console.log("server started on port " + port);
});

