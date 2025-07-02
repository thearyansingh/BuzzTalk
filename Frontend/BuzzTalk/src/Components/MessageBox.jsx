import React, { useRef, useState,useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import OtherUser from "./otherUser";
import SendMessage from "./SendMessage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import useMessage from "../Hooks/useMessage";
import { setMessages } from "../Redux/userSlice";
const MessageBox = () => {
  const userSelected = useSelector((state) => state.user.userMessage);
  const {messages} = useSelector(store => store.user);
  const dispatch=useDispatch();

  // const [sendMessage,SetMessage]=useState("");
  const inputRef=useRef()
  // console.log(sendMessage)
  // console.log(userSelected._id)
const handlesubmit=async(e)=>{
  e.preventDefault();

   const  inputValue= inputRef.current?.value
   console.log(inputValue)
try {
  const {data}= await axios.post(`http://localhost:4000/api/message/sentMessage/${userSelected?._id}`,
    {messages:inputValue},
    { withCredentials: true }
  )
  console.log(data)
  if(data){
    console.log(data.newMessage.messages)
 dispatch(setMessages([...(messages || []), data?.newMessage]));
      inputRef.current.value = "";
      // window.scrollTo(0,document.body.scrollHeight);
  }
} catch (error) {
  console.log(error)
}
}
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
useMessage()
  return (
    <div className="flex flex-col w-full border-gray-500">
      <div className="flex items-center p-4 bg-gray-600 rounded-xl gap-4">
        <div className="w-10 rounded-full relative">
          <img
            className="bg-cover bg-center rounded-full"
            src={userSelected?.profilePic}   alt="profile"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <p className="text-lg font-bold ">{userSelected?.Fullname}</p>
      </div>
     <div className="p-3 h-[250px] sm:h-[400px] overflow-y-auto">
        {messages?.length >0 ? (
          messages.map((msg) => (
            <SendMessage key={msg._id} messages={msg} senderid={msg.senderId} receiverid={msg.receiverId} />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No messages yet.</p>
        )}
         <div ref={bottomRef} />
      </div>

    
  <form onSubmit={handlesubmit} className=" flex justify-between p-4 items-center bg-gray-500 rounded-xl">
          <input
            type="text"
        ref={inputRef}
            className=" border-0 decoration-0 focus:outline-none" 
            placeholder="Send a message...."
          />
          <IoMdSend type="submit" className="h-6 w-6 cursor-pointer"   />
        </form>

      
    
    </div>
  );
};

export default MessageBox;
