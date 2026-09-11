// import express from 'express'
// import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogComment, getBlogsById, togglePublish } from '../controllers/BlogController.js';
// import upload from '../middleware/multer.js';
// import auth from '../middleware/auth.js';

// const blogRouter = express.Router();

// blogRouter.post("/add" , upload.single('image') , auth ,addBlog)
// blogRouter.get('/all' , getAllBlogs);
// blogRouter.get('/:blogId' , getBlogsById );
// blogRouter.post('/delete' , auth , deleteBlogById );
// blogRouter.post('/toggle-publish', auth ,  togglePublish );

// blogRouter.post('/add-comment' , addComment)
// blogRouter.post('/comments' , getBlogComment)


// export default blogRouter;

import express from 'express';
import { addBlog, getAllBlogs, getBlogsById, deleteBlogById, togglePublish, addComment, getBlogComment, generateContent } from '../controllers/BlogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

// Blog routes
blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogsById);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComment);
blogRouter.post('/generate', auth , generateContent);



export default blogRouter;
