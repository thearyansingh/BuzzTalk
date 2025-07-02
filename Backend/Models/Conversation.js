import mongoose from "mongoose";
const ConvoSchema= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,  //  list of user involve in conversation by taking the reference
       ref:'User'
    }],
      messages:[{
        type:mongoose.Schema.Types.ObjectId,   // with their messages
       ref:'Messages'
    }],
  
},
{ timestamps: true }
)
const Conversation= mongoose.model("Conversation",ConvoSchema);
export default  Conversation;

