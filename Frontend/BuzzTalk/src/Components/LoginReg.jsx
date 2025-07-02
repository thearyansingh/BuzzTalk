import React, { useState } from "react";
import { bgHome } from "../assets/assets";
import { Link } from "react-router-dom";
 import {toast} from 'react-toastify';
 import { useNavigate } from "react-router-dom";


const LoginReg = () => {
  const Navigate=useNavigate();
const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({
    email: "",
    Fullname: "",
    username: "",
    password: "",
    profilePic: null,
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }));
  };
  
  const onsubmitHandler = async (e) => {
    e.preventDefault();
  
    
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("Fullname", user.Fullname);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("gender", user.gender);
      formData.append("profilePic", user.profilePic);

      const res = await fetch("https://buzztalk-la08.onrender.com/api/user/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("User registered successfully");
        Navigate("/login");
        console.log(data);
      } else {
           e.target.reset();
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err)
      console.error("Error submitting form", err);
    }
  };

  return (
 
      <div className="w-full max-w-md backdrop-blur-md bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Register
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={onsubmitHandler}>
          <div>
            <label className="text-white text-md">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={user.email}
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-md">Full Name</label>
            <input
              type="text"
              name="Fullname"
              onChange={handleChange}
              value={user.Fullname}
              placeholder="Your full name"
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-md">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={user.username}
              placeholder="Choose a username"
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-md">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Create a password"
              className="w-full mt-1 p-2 rounded-md text-slate-500 bg-white/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white text-md">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
              className="w-full mt-1 p-1 rounded-md text-slate-500 bg-white/70"
            />
          </div>

          <div className="flex items-center gap-6 mt-2">
            <label className="text-white flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              Male
            </label>
            <label className="text-white flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <p className="text-white">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            Register
          </button>
        </form>
      </div>
 
  );
};

export default LoginReg;
