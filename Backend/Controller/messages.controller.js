import { getReceiverSocketId, io } from "../index.js";
import Conversation from "../Models/Conversation.js";
import Messages from "../Models/message.js";


const messageController=async(req,res)=>{
try {
    const senderId=req.id;
const receiverId=req.params.id;
const {messages}=req.body;

let gotConversation=await Conversation.findOne({participants:{$all:[senderId,receiverId]}})

if(!gotConversation){
   gotConversation=await Conversation.create({participants:[senderId,receiverId]})
}
const newMessage=await Messages.create({
    senderId,
    receiverId,
    messages
})


// console.log(gotConversation.messages)
if(newMessage){
    gotConversation.messages.push(newMessage._id);
}
await gotConversation.save();
 await Promise.all([gotConversation.save(),newMessage.save()])

// websocket
const receiverSocketId=getReceiverSocketId(receiverId)
if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)
}

 return res.status(200).json({
    message:`message sent successfully from sender ${senderId} to ${receiverId}`,
    newMessage
});


} catch (error) {
//   console.log("message error",error.message)  
return res.status(500).json({message:"ERROR DURING MESSAGE SENT", error:error.message});

}
}

const GetMessage=async(req,res)=>{
    try {
         const sender=req.id;
 const receiver=req.params.id;


 const getMessage=await Conversation.findOne({participants:{$all:[sender,receiver]}}).populate("messages")
return res.status(200).json({message:getMessage})
    } catch (error) {
       res.status(500).json({message:"Getting message Error",error:error.message}) 
    }


}
export  {messageController,GetMessage};