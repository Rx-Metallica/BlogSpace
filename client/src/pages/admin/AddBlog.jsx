import React, { useState } from 'react'
import { parse } from 'marked'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {
  Image as ImageIcon,
  Type,
  Edit,
  AlignLeft,
  Tag,
  Sparkles,
  UploadCloud
} from 'lucide-react'
import { assets, blogCategories } from '../../assets/assets'

const AddBlog = () => {
  const { axios } = useAppContext()

  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Startup')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsAdding(true)

      const blog = {
        title,
        subTitle: subtitle,
        description,
        category
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData)
      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setTitle('')
        setSubtitle('')
        setDescription('')
        setCategory('Startup')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsAdding(false)
    }
  }

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title')
    try {
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: title })
      if (data.success) {
        setDescription(parse(data.content))
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen py-10 px-6 flex justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <UploadCloud className="w-8 h-8 text-blue-600" /> Add New Blog
        </h2>

        {/* Image Upload */}
        <div className="mb-6">
          <label className=" text-gray-700 mb-2 font-medium flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gray-500" /> Upload Thumbnail
          </label>
          <label htmlFor="image" className="flex items-center gap-4 cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="thumbnail"
              className="w-28 h-28 object-cover rounded border border-gray-300"
            />
            <input
              id="image"
              type="file"
              accept="image/*"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className=" text-gray-700 mb-2 font-medium flex items-center gap-2">
            <Type className="w-5 h-5 text-gray-500" /> Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label className=" text-gray-700 mb-2 font-medium flex items-center gap-2">
            <Edit className="w-5 h-5 text-gray-500" /> Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-6 relative">
          <label className=" text-gray-700 mb-2 font-medium flex items-center gap-2">
            <AlignLeft className="w-5 h-5 text-gray-500" /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Write your blog content here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none resize-none"
            required
          ></textarea>

          {loading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
              <div className="w-8 h-8 border-2 border-t-white border-gray-300 rounded-full animate-spin"></div>
            </div>
          )}

          {/* <button
            type="button"
            onClick={generateContent}
            disabled={loading}
            className="absolute bottom-3 right-3 flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <Sparkles className="w-4 h-4" /> Generate
          </button> */}
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className=" text-gray-700 mb-2 font-medium flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-500" /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
          >
            {blogCategories.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isAdding}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <UploadCloud className="w-5 h-5" />
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </section>
  )
}

export default AddBlog
