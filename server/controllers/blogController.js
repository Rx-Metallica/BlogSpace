import fs from 'fs';
import Blog from '../models/Blog.js';
import imagekit from '../configs/imagekit.js';



export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogspace'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        })

        const image = optimizedImageUrl;


        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
        });
       
        res.status(201).json({ success: true, message: "Blog added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getBlogById = async (req, res) =>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;  // ⬅ get from URL

        if (!id) {
            return res.status(400).json({ success: false, message: "Blog ID is required" });
        }

        await Blog.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
