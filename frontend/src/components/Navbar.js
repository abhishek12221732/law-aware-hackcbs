import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../assets/images/usericon.png';
import Side from '../assets/images/sidelogo.png';
import Cookies from 'js-cookie';
import { base_url } from '../constants/contants';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token')); // Check login status on load
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Check if token is set, to update isLoggedIn state
    const token = Cookies.get('token');
    if (token !== undefined && !isLoggedIn) {
      setIsLoggedIn(true);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isLoggedIn]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await fetch(`${base_url}/logout`, {
        method: 'POST',
        credentials: 'include', // Ensure the cookies are included
      });
      
      // Clear the token and update login status
      Cookies.remove('token');
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`bg-opacity-80 p-4 text-[#03254e] fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <nav className="flex items-center justify-between container mx-auto">
        <h1 className="text-2xl font-bold bg-blue">
          <img src={Side} className="h-10 mix-blend-multiply" alt="Logo" />
        </h1>
        <div className="flex items-center space-x-12 poppins-bold">
          <Link to="/" className="hover:text-[#69b578]">HOME</Link>
          <Link to="/children" className='hover:text-[#69b578]'>CHILDREN</Link>
          <Link to="/learning" className="hover:text-[#69b578]">LEARNING</Link>
          <Link to="/awareness" className="hover:text-[#69b578]">AWARENESS</Link>
          
          {/* Profile/Login Button */}
          <div className="flex items-center cursor-pointer w-8 h-8 rounded-full overflow-hidden bg-[#2e4bc1] hover:opacity-90 transition-opacity"
            onClick={handleProfileClick}>
            <img src={UserIcon} alt="User Icon" className="w-full h-full mix-blend-multiply" />
          </div>

          {/* Logout Button */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:text-[#69b578]">
              LOGOUT
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
