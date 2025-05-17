import mongoose from "mongoose";

const connectDb=async()=>{
  try {
 const database=await mongoose.connect(process.env.MONGO_DB);
 if(database){
    console.log("database connected");
 }
  } catch (error) {
    console.log("connection error",error);
  } 
}
export default connectDb;