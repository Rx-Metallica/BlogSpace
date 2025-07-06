import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  PlusSquare,
  List,
  MessageCircle
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/admin/addBlog', icon: <PlusSquare size={20} />, label: 'Add Blog' },
    { to: '/admin/listBlog', icon: <List size={20} />, label: 'List Blog' },
  ];

  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          end={to === '/admin'}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition
            ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary' : 'text-gray-700'}`
          }
        >
          {icon}
          <p className="hidden md:inline-block">{label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
