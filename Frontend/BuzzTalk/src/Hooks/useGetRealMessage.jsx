import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { GetMessage } from "../../../../Backend/Controller/messages.controller";
import { setMessages } from "../Redux/userSlice";
const useGetRealMessage = () => {
  const { socket } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.user);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...(messages || []), newMessage]));
    });
  }, [socket, setMessages, messages]);
};

export default useGetRealMessage;
