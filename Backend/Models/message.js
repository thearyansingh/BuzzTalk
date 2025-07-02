import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId:{
  type:mongoose.Schema.Types.ObjectId,  // this is used to get the refernce id from the user models
  ref:'User',
  require:true
    },
     receiverId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  require:true
    },
    messages:{
type:String,
require:true
    }
  },
  { timestamps: true },

)
const Messages = mongoose.model('Messages', MessageSchema);

export default Messages;