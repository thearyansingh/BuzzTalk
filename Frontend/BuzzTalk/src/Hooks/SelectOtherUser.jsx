import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAlluser, setMessageUser } from '../Redux/userSlice'
const SelectOtherUser = () => {
  const dispatch=useDispatch();
    useEffect(() => {
      const alluser=async()=>{
      try {
          const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getAll`, {
        withCredentials: true, //correct way in Axios
      }) 
if(res.status==200){
  dispatch(setAlluser(res.data.users))
  dispatch(setMessageUser(res.data.users[0]))
  // console.log(res.data.users)
}
      
      } catch (error) {
        console.log(error)
      }
      }
      alluser();
    }, [])
}

export default SelectOtherUser
