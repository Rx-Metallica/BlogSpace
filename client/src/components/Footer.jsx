import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 text-gray-700">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-xl font-semibold">BlogSpace</h2>

          <nav className="flex gap-6 text-sm">
            <Link className="hover:underline">Home</Link>
            <Link className="hover:underline">About</Link>
            <Link className="hover:underline">Contact</Link>
            <Link className="hover:underline">Privacy</Link>
          </nav>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Bottom Row */}
        <div className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BlogSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
