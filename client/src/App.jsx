import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './components/admin/Login';
import Layout from './pages/admin/Layout';
import ListBlog from './pages/admin/ListBlog';
import AddBlog from './pages/admin/AddBlog';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  const { token } = useAppContext();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
        <Route index element={<Dashboard />} /> {/* show dashboard by default */}
          <Route path="addBlog" element={<AddBlog />} />
          <Route index path="listBlog" element={<ListBlog />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
