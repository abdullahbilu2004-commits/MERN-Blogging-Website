import express from 'express'
import { adminlogin, approveCommentByID, deleteCommentByID, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/AdminController.js';
import auth from '../middleware/auth.js'

const adminRouter = express.Router();

adminRouter.post("/login" , adminlogin)
adminRouter.get("/comments" , auth ,  getAllComments)
adminRouter.get("/blogs" , auth ,  getAllBlogsAdmin)
adminRouter.post("/delete-comment" , auth ,  deleteCommentByID)
adminRouter.post("/approve-comment" , auth ,  approveCommentByID)
adminRouter.get("/dashboard" , auth ,  getDashboard)


export default adminRouter;