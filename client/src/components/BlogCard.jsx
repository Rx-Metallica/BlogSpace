import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  const {_id, title, image, subTitle, description, category} = blog;

  const navigate = useNavigate();

  return (
    <div
      onClick={()=>navigate(`/blog/${_id}`)}

      className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <span className="text-xs text-gray-500">{category}</span>

        <h2 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
