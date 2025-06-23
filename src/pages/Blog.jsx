import React from 'react';
import { useParams } from 'react-router-dom';
import { blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';

// Simulated blog data (replace with real fetch or prop)


const BlogPage = () => {
  const { id } = useParams();

  // Get blog by ID
  const blog = blog_data.find((b) => b._id === (id));

  if (!blog) {
    return <div className="text-center py-20 text-gray-600">Blog not found.</div>;
  }

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md mb-6" />

      <span className="text-sm text-indigo-500 uppercase font-semibold tracking-wide">
        {blog.category}
      </span>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
        {blog.title}
      </h1>

      <h2 className="text-lg text-gray-600 mt-1 mb-6">{blog.subTitle}</h2>

      <div
        className="text-gray-700 leading-7 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: blog.description }} />
    </div></>
  );
};

export default BlogPage;
