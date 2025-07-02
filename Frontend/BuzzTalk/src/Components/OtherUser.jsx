import React from 'react'
import { useSelector } from 'react-redux'

const OtherUser = ({name,image,userId}) => {
  const {userMessage}=useSelector(store=>store.user);
  const {onlineUser}=useSelector(store=>store.user)
  const isOnline=onlineUser.includes(userId)
  return (
    <>
    <div className='flex gap-4  item-center py-3 px-4 backdrop-blur-md bg-white/40 rounded-2xl hover:bg-zinc-700  duration-500'>
        
        <div className='w-10 rounded-full relative'>
            <img className='bg-cover bg-center rounded-full' src={image} alt="" />
      {
        isOnline?<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>:<></>
      }  
        </div>
        <div className='flex justify-center items-center'>
            <p>{name}</p>
        </div>

    </div>
    <div className='sm:divider '></div>
    </>
  )
}

export default OtherUser
