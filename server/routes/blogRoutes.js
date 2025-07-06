import express from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addBlog ,getBlogs, getBlogById, deleteBlog } from '../controllers/blogController.js';


const blogRouter = express.Router()

blogRouter.post('/add',upload.single('image'),auth,addBlog);
blogRouter.get('/all',getBlogs);
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete',auth,deleteBlog)


export default blogRouter;