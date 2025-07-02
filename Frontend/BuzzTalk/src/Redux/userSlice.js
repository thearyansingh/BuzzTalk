// src/Redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage on first load
const getUserFromStorage = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  authUser: getUserFromStorage(),   // ✅ Load from storage initially
  alluser: null,
  userMessage: null,
  messages: [],
  socket:null,
  onlineUser:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;

      // Persist to localStorage
      localStorage.setItem('authUser', JSON.stringify(action.payload));
    },
    setAlluser(state, action) {
      state.alluser = action.payload;
    },
    setMessageUser(state, action) {
      state.userMessage = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setSocket(state,action){
state.socket=action.payload
    },
     setOnline(state,action){
state.onlineUser=action.payload
    },
    logoutUser(state) {
      state.authUser = null;
      state.userMessage = null;
      state.messages = null;
      localStorage.removeItem('authUser'); 
    }
  },
});

export const {
  setAuthUser,
  setAlluser,
  setMessageUser,
  setMessages,
  setSocket,
  logoutUser,
  setOnline
} = userSlice.actions;

export default userSlice.reducer;
