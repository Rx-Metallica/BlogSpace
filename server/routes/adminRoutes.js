import express from 'express';
import { adminLogin,getAllBlogs } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.get('/blogs',auth,getAllBlogs)




export default adminRouter;