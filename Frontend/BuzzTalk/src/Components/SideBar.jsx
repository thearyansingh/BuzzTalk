import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import OtherUser from "./otherUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectOtherUser from "../Hooks/SelectOtherUser";
import { useDispatch, useSelector } from 'react-redux';
import { setMessageUser } from "../Redux/userSlice";
import { logoutUser } from "../Redux/userSlice";
const SideBar = () => {
  const Navigate = useNavigate();
  const [SearchUser,setSearch]=useState("");
   const users = useSelector((state) => state.user.alluser);
  //  const [alluser,setUsers]=useState(users)

   const dispatch=useDispatch();
   const handleUserId = (user) => {
  dispatch(setMessageUser(user));
};



const filteredUsers = users?.filter(user =>
    user.Fullname.toLowerCase().includes(SearchUser.toLowerCase())
  );

  
  const HandleLogout = async () => {
    const logout = await axios.post(
      "https://buzztalk-la08.onrender.com/api/user/logout",
      {},
      {
        withCredentials: true, //correct way in Axios
      }
    );
    if (logout.status == 200) {
      Navigate("/Login");
       dispatch(logoutUser())
        toast.success("Logout Successfull");
     
    }
  };
  SelectOtherUser();


  return (
    <div className="flex flex-col w-full sm:max-w-[300px]  border-gray-500">
      {/* searchBox */}
      <form action=""  className="flex gap-2 p-2 justify-between">
        <input
          type="text"
          placeholder="...Search"
           onChange={(e) => setSearch(e.target.value)}
          value={SearchUser}
          className="p-3 rounded-2xl w-full border-white bg-white text-black"
        />
        <button
          className="p-4 rounded-2xl bg-amber-50 text-black"
        
        >
          {" "}
          <FaSearch className="h-4 w-4" />{" "}
        </button>
      </form>
      <div className="divider "></div>
      <div className="flex flex-col gap-1 custom-scrollbar overflow-auto h-[200px] sm:h-full  cursor-pointer ">
      {
      filteredUsers?.map((user) => (
       
      <div onClick={()=>handleUserId(user)} key={user.id} 
>
       <OtherUser  name={user.Fullname} userId={user._id} image={user.profilePic} /></div>
      ))}
      </div>
      <button
        onClick={HandleLogout}
        className="p-2 rounded-xl mt-2 max-w-[70px] text-sm font-semibold bg-amber-50  border border-gray-400 text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default SideBar;
