import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import MessageBox from './MessageBox';

const Home = () => {
  const { authUser } = useSelector(store => store.user); // note: key should match slice
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login'); // redirect to login page if not logged in
    }
  }, []);

  
  return (
    <div className='flex flex-col w-full max-w-3xl sm:h-[450px] md:h-[550px] sm:flex-row gap-4 backdrop-blur-md bg-gray/20 rounded-3xl p-2 shadow-2xl border border-white/30'>
      <SideBar />
      <div className='sm:divider'></div>
      <MessageBox />
    </div>
  );
};

export default Home;
