import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mongodbConnect from "./config/mongodb.js";
import { UserRouter } from "./Routes/userRoute.js";
dotenv.config({});
import path from "path";
import { fileURLToPath } from "url";

//App Config
const app = express();
const port = process.env.PORT || 4000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//middleWares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// api endpoints


app.use("/api/user",UserRouter);

app.listen(port, () => {
  mongodbConnect();
  console.log("server started on port " + port);
});
