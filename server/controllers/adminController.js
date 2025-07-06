import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD ){
            return res.json({success: false, message: "Invalid Credentials"})
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    }catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}