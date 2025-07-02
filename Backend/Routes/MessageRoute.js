import express from 'express'
import  { GetMessage,messageController } from '../Controller/messages.controller.js';
import Authjs from '../Middleware/Auth.js';


const messageRouter=express.Router();

messageRouter.post("/sentMessage/:id",Authjs,messageController);
messageRouter.get("/getMessage/:id",Authjs,GetMessage);






export {messageRouter};