import { FiPlus } from 'react-icons/fi';

const CommentInput = ({
  postId,
  newCommentContent,
  setNewCommentContent,
  handleAddComment
}) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Your avatar"
        className="h-12 w-12 rounded-full object-cover border-2 border-purple-300"
      />
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        value={newCommentContent[postId] || ''}
        onChange={(e) => setNewCommentContent(prev => ({ ...prev, [postId]: e.target.value }))}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
                handleAddComment(postId);
            }
        }}
      />
      <button
        onClick={() => handleAddComment(postId)}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-sm transition-all duration-200"
        aria-label="Add comment"
      >
        <FiPlus className="text-xl" />
      </button>
    </div>
  );
};

export default CommentInput;