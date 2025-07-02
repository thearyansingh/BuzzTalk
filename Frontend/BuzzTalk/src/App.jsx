import React, { useState } from 'react'
import { Routes,Router,BrowserRouter,Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import LoginReg from './Components/LoginReg'
import { bgHome } from './assets/assets'
import './index.css'
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
// import { socket } from './socket';
import io from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOnline, setSocket } from './Redux/userSlice'

const App = () => {
const {socket}=useSelector(store=>store.user)
  const {authUser}=useSelector(store=>store.user);

const dispatch=useDispatch();
useEffect(() => {
  if (authUser) {
   const socket=io('http://localhost:4000',{
query:{userId:authUser._id}
   })
 
  //  console.log(socket)
     dispatch(setSocket(socket))
     socket.on('getOnlineUsers',(onlineUsers)=>{
      dispatch(setOnline(onlineUsers))
     })
     return ()=>socket.close();
  }
  else{
    if(socket){
      socket.closer();
      dispatch(setSocket(null))
      
    }
  }

}, [authUser]);
// console.log(socket)


  return (
    <div  className='min-h-screen bg-cover bg-center flex items-center justify-center px-4'
      style={{ backgroundImage: `url(${bgHome})` }}
    >


        <Routes>  
    <Route path="/Home" element={<Home />} />
    <Route path="/Login" element={<Login/>} />
    <Route path="/" element={<LoginReg/>} />
  </Routes>
    </div>
   
  
  )
}

export default App
