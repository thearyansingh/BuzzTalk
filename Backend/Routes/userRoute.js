import express from 'express'
import { allusers, register, userById,Login,forgotPassword,resetPassword } from '../Controller/User.controller.js';
import upload from '../Middleware/Upload.js';


const UserRouter=express.Router();

UserRouter.post('/register', upload.single('profilePic'), register);
UserRouter.post('/login', Login);
UserRouter.get('/getAll', allusers);
UserRouter.get('/userById/:id',userById);
UserRouter.post("/forgot-password",forgotPassword);
UserRouter.post("/reset-password/:token", resetPassword);





export {UserRouter};