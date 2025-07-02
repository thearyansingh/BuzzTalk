import React from 'react'
import { useSelector } from 'react-redux'
import useGetRealMessage from "../Hooks/useGetRealMessage";

const SendMessage = ({messages,senderid}) => {

  const selectedUser = useSelector((state) => state.user.userMessage);
  const {authUser} = useSelector(store => store.user);
  console.log(senderid)
  console.log(authUser?.profilePic)

  useGetRealMessage();

//  console.log(authUser)
  return (
      <div className={ ` chat ${authUser._id===senderid?'chat-end':'chat-start'}`}>
  <div className="chat-image avatar cursor-pointer">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
 src={`${authUser._id === senderid ?authUser?.profilePic :selectedUser?.profilePic}`}
      />
    </div>
  </div>
  <div className="chat-header">
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className={`${authUser._id===senderid?'chat-bubble chat-bubble-neutral-content':'chat-bubble chat-bubble-accent'}`}>{messages.messages}</div>

</div>

  )
}

export default SendMessage
