import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mongodbConnect from "./config/mongodb.js";

dotenv.config({});

//App Config
const app = express();
const port = process.env.PORT || 4000;

//middleWares

app.use(express.json());
app.use(cors());

// api endpoints

app.get("/", (req, res) => {
  res.send("API is Working");
});
app.listen(port, () => {
  mongodbConnect();
  console.log("server started on port " + port);
});
