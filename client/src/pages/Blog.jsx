import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${id}`);
        console.log("API Response:", data);

        if (data.success) {
          setData(data.blog); // or data.blogs if that's your API
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchBlogData();
  }, [id, axios]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Loading blog...</div>;
  }

  if (notFound || !data) {
    return <div className="text-center py-20 text-red-600">Blog not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <img
          src={data.image || "/default.jpg"}
          alt={data.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        <span className="text-sm text-indigo-500 uppercase font-semibold tracking-wide">
          {data.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
          {data.title}
        </h1>

        <h2 className="text-lg text-gray-600 mt-1 mb-6">
          {data.subTitle}
        </h2>

        <div
          className="text-gray-700 leading-7 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: data.description || '' }}
        />
      </div>
    </>
  );
};

export default Blog;
