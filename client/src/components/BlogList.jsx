import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';  // assuming this is an array of categories
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { blogs } = useAppContext();

  // filter blogs by selected category
 const filteredBlogs =
  selectedCategory === 'All'
    ? blogs
    : blogs.filter((blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {/* using imported blogCategories instead */}
        {['All', ...blogCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition duration-200`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
