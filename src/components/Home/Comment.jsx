import { FiSave, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';

const Comment = ({
  comment,
  editingCommentId,
  setEditingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleUpdateComment,
  handleDeleteComment
}) => {
  return (
    <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
      <img
        src={comment.user.avatar}
        alt={comment.user.name}
        className="h-10 w-10 rounded-full object-cover border-2 border-purple-200"
      />
      <div className="flex-1">
        <div className="flex items-baseline space-x-2 mb-1">
          <span className="font-semibold text-gray-800">{comment.user.name}</span>
          <span className="text-xs text-gray-500">• {comment.time}</span>
        </div>
        {editingCommentId === comment.id && comment.user.name === 'You' ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
              className="flex-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
              onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                      handleUpdateComment();
                  }
              }}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleUpdateComment}
                className="p-2 text-purple-700 hover:bg-purple-100 rounded-full transition-all duration-200"
                aria-label="Save comment"
              >
                <FiSave className="text-lg" />
              </button>
              <button
                onClick={() => setEditingCommentId(null)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Cancel editing"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700">{comment.content}</p>
        )}
        {comment.user.name === 'You' && editingCommentId !== comment.id && (
          <div className="flex space-x-3 mt-2">
            <button
              onClick={() => {
                setEditingCommentId(comment.id);
                setEditedCommentContent(comment.content);
              }}
              className="text-xs text-purple-600 font-medium hover:underline flex items-center space-x-1 transition-colors duration-200"
            >
              <FiEdit className="text-sm" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeleteComment}
              className="text-xs text-red-600 font-medium hover:underline flex items-center space-x-1 transition-colors duration-200"
            >
              <FiTrash2 className="text-sm" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;