import express from 'express'
import { allusers, register, userById,Login,forgotPassword,resetPassword, Logout } from '../Controller/User.controller.js';
import upload from '../Middleware/Upload.js';
import Authjs from '../Middleware/Auth.js';


const UserRouter=express.Router();

UserRouter.post('/register', upload.single('profilePic'), register);
UserRouter.post('/login', Login);
UserRouter.get('/getAll',Authjs,allusers);
UserRouter.post('/logout',Logout);

UserRouter.get('/chat/:id',userById);
UserRouter.post("/forgot-password",forgotPassword);
UserRouter.post("/reset-password/:token", resetPassword);





export {UserRouter};