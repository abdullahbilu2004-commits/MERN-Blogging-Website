import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import Comment from '../models/Comment.js'


export const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getAllBlogsAdmin = async (req,res) => {
    try {
        const blogs = await Blog.find({}).sort({creeatedAt: -1});
        res.json({success: true , blogs})
    } catch (error) {
        res.json({sucess:false , messege:error.messege})
    }   
}

export const getAllComments = async (req,res) => {
    try {
        const comments = await Comment.find({})
            .populate("blog")
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getDashboard = async (req,res) => {
    try {
        const recentBlogs = await Blog.find({})
            .sort({ createdAt: -1 })   // ✅ correct way to sort
            .limit(5);                 // last 5 blogs

        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        };

        res.json({ success: true, dashboardData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const deleteCommentByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message }); // typo fixed: messege → message
  }
};

export const approveCommentByID = async (req, res) => {
  try {
    const { id } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



