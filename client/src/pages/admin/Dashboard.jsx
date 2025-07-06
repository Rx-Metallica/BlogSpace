import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FileText, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { axios } = useAppContext()
  const [blogsCount, setBlogsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchBlogsCount = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/admin/blogs')
      if (data.success) {
        setBlogsCount(data.blogs.length)
      } else {
        toast.error("Error fetching blogs: " + data.message)
      }
    } catch (error) {
      toast.error("Server error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogsCount()
  }, [])

  return (
    <div className="flex-1 py-10 px-6 sm:px-16 bg-blue-50/50">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Total Blogs</h2>
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <p className="text-3xl font-bold text-gray-700">{blogsCount}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
