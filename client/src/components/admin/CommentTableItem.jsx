import React from 'react';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment; // get _id here
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', {
        id: _id // use _id from comment
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this comment?");
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', {
        id: _id // use _id from comment
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b>: {blog?.title}
        <br /><br />
        <b className='font-medium text-gray-600'>Name</b>: {comment.name}
        <br />
        <b className='font-medium text-gray-600'>Comment</b>: {comment.content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className='w-5 cursor-pointer hover:scale-110 transition-all'
              alt="approve"
            />
          ) : (
            <p className='text-xs border bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            className='w-5 cursor-pointer hover:scale-110 transition-all'
            alt="delete"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
