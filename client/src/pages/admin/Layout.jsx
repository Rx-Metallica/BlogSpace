import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { axios, navigate, setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    navigate('/');
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
        <div
          onClick={() => navigate('/')}
          className="text-xl font-bold cursor-pointer"
        >
          BlogSpace
        </div>

        <button
          onClick={logout}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </nav>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
