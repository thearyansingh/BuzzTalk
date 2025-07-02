import React, { useState,useRef } from "react";
import { bgHome } from "../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/userSlice";

const Login = () => {
  const ApiUrl=import.meta.env.VITE_API_BASE_URL;
  // const [user, setUser] = useState({
  //   username: "",
  //   password: "",
  // });
   const nameRef = useRef();
  // const emailRef = useRef();
  const passwordRef = useRef();
  const navigate=useNavigate();
  
  const dispatch=useDispatch();
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
   
  // };
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const   username= nameRef.current?.value
    const password= passwordRef.current?.value    
  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }
    try {
      const resp = await axios.post(`${ApiUrl}/api/user/login`, {username,password},
         {
        withCredentials: true, // <-- sends & accepts cookies
      }
    );
    console.log(resp)
    if(resp.status===200){
         toast.success("login successfull");
        dispatch(setAuthUser(resp.data.username));
          // Cookies.set('token', resp.data.userToken, { expires: 7 });
          navigate('/Home')
        console.log("User Login Data:", resp);
    }
   
   
  
  
    } catch (error) {
       const message = error.response?.data?.message || "Login failed. Please try again.";
    toast.error(message);
    console.error("Login error:", error);
    }
  };

  return (
  
      <div className="w-full max-w-md backdrop-blur-md bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={onsubmitHandler}>
          <div>
            <label className="text-white text-sm">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
            ref={nameRef}
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              ref={passwordRef}
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-300 underline" to="/">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>
      </div>
  
  );
};

export default Login;
