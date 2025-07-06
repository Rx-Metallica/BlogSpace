import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Edit, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        console.error("Fetch blogs error:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error.message);
    }
  };

  const deleteBlog = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;
  try {
    const { data } = await axios.post('/api/blog/delete', { id });
    if (data.success) {
      fetchBlogs();
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Delete failed: " + data.message);
    }
  } catch (error) {
    toast.error("Server error: " + error.message);
  }
};


  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

      <div className="relative mt-4 max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-100">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50 border-b last:border-none">
                  <td className="px-2 py-4 xl:px-6">{index + 1}</td>
                  <td className="px-2 py-4">{blog.title}</td>
                  <td className="px-2 py-4 max-sm:hidden">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-4 max-sm:hidden">
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      Active
                    </span>
                  </td>
                  <td className="px-2 py-4 flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => alert('Edit feature coming soon')}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
