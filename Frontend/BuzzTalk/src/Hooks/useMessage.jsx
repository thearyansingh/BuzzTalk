import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { GetMessage } from '../../../../Backend/Controller/messages.controller';
import { setMessages } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
const useMessage = () => {
  const { userMessage } = useSelector((store) => store.user); // this is your receiver
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Guard clause: don't run if userMessage is not set
    const getAllMessages = async () => {
      try {
        // setLoading(true);
        const {data} = await axios.get(
          `http://localhost:4000/api/message/GetMessage/${userMessage._id}`,
          { withCredentials: true }
        );
        // console.log(data)
        dispatch(setMessages(data?.message?.messages))
      
      } catch (error) {
        console.error("Error fetching messages:", error);
      } 
    };

    getAllMessages();
  }, [userMessage,dispatch]); // 🔁 only runs when userMessage changes


};

export default useMessage;
