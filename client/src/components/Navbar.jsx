import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const {navigate,token} = useAppContext();
  
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Left Side - Logo or App Name */}
      <div onClick={()=>navigate('/')} className="text-xl font-bold cursor-pointer">
        BlogSpace
      </div>

      {/* Right Side - Login */}
      <div>
        <button onClick={()=>navigate('/admin')} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200">
          {token ? 'Dashboard' : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
