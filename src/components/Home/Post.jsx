import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import Comment from './Comment';
import CommentInput from './CommentInput';
import Card from './Card';

const Post = ({
  post,
  handleLikePost,
  toggleComments,
  handleSharePost,
  shareFeedback,
  newCommentContent,
  setNewCommentContent,
  showComments,
  handleAddComment,
  editingCommentId,
  setEditingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleUpdateComment,
  handleDeleteComment
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="h-14 w-14 rounded-full object-cover border-2 border-purple-300"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-800">{post.user.name}</h3>
            <p className="text-sm text-gray-500">{post.user.title} • {post.time}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
          <FiMoreHorizontal className="text-xl" />
        </button>
      </div>
      <p className="mb-4 text-gray-800 leading-relaxed">{post.content}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:bg-purple-200 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-200 py-3 my-4">
        <span className="font-medium">{post.likes} likes</span>
        <button onClick={() => toggleComments(post.id)} className="hover:underline hover:text-purple-700 transition-colors duration-200">
          {post.comments} comments • {post.shares} shares
        </button>
      </div>
      <div className="flex justify-between pt-2">
        <button
          onClick={() => handleLikePost(post.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${post.liked ? 'text-purple-700 bg-purple-50 font-semibold' : 'text-gray-600 hover:text-purple-700 hover:bg-gray-100'}`}
        >
          <FiHeart className={`${post.liked ? 'fill-current text-purple-700' : 'text-gray-600'} text-xl`} />
          <span>Like</span>
        </button>
        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
        >
          <FiMessageCircle className="text-xl" />
          <span>Comment</span>
        </button>
        <div className="relative">
          <button
            onClick={() => handleSharePost(post.id, post.content)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <FiShare2 className="text-xl" />
            <span>Share</span>
          </button>
          {shareFeedback[post.id] && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-md z-10 animate-fade-in-up">
              {shareFeedback[post.id]}
            </span>
          )}
        </div>
      </div>

      {showComments[post.id] && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h5 className="font-bold text-lg text-gray-800 mb-4">Comments ({post.comments})</h5>
          <div className="space-y-4 mb-5">
            {post.commentsList.length === 0 ? (
              <p className="text-sm text-gray-500 p-3 bg-gray-100 rounded-lg italic">No comments yet. Be the first to comment!</p>
            ) : (
              post.commentsList.map(comment => (
                <Comment 
                  key={comment.id}
                  comment={comment}
                  editingCommentId={editingCommentId}
                  setEditingCommentId={setEditingCommentId}
                  editedCommentContent={editedCommentContent}
                  setEditedCommentContent={setEditedCommentContent}
                  handleUpdateComment={() => handleUpdateComment(post.id, comment.id)}
                  handleDeleteComment={() => handleDeleteComment(post.id, comment.id)}
                />
              ))
            )}
          </div>
          
          <CommentInput 
            postId={post.id}
            newCommentContent={newCommentContent}
            setNewCommentContent={setNewCommentContent}
            handleAddComment={handleAddComment}
          />
        </div>
      )}
    </Card>
  );
};

export default Post;