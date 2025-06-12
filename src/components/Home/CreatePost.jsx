import { FiPlus, FiX, FiBookOpen, FiBriefcase, FiUsers } from 'react-icons/fi';

const CreatePost = ({
  showPostForm,
  setShowPostForm,
  postType,
  setPostType,
  newPostContent,
  setNewPostContent,
  handleCreatePost
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 mb-6">
      {showPostForm ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">Create {postType === 'post' ? 'Post' : postType.charAt(0).toUpperCase() + postType.slice(1)}</h3>
            <button onClick={() => setShowPostForm(false)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all duration-200">
              <FiX className="text-xl" />
            </button>
          </div>
          <textarea
            placeholder={`What's on your mind, ${postType} an update, article, or opportunity...?`}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-y min-h-[100px]"
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPostType('post')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${postType === 'post' ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Post
              </button>
              <button
                onClick={() => setPostType('learning')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${postType === 'learning' ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Learning
              </button>
              <button
                onClick={() => setPostType('job')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${postType === 'job' ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Job
              </button>
            </div>
            <button
              onClick={handleCreatePost}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200 flex items-center space-x-2"
            >
              <FiPlus />
              <span>Create</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Your avatar"
              className="h-12 w-12 rounded-full object-cover border-2 border-purple-500"
            />
            <button
              onClick={() => setShowPostForm(true)}
              className="flex-1 text-left bg-gray-100 text-gray-600 px-5 py-3 rounded-full hover:bg-gray-200 transition-all duration-200"
            >
              Share an update, article, or opportunity...
            </button>
          </div>
          <div className="flex justify-around text-base">
            <button
              onClick={() => { setPostType('learning'); setShowPostForm(true); }}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <FiBookOpen className="text-xl" />
              <span className="hidden sm:inline">Learning</span>
            </button>
            <button
              onClick={() => { setPostType('job'); setShowPostForm(true); }}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <FiBriefcase className="text-xl" />
              <span className="hidden sm:inline">Job</span>
            </button>
            <button
              onClick={() => { setPostType('event'); setShowPostForm(true); }}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <FiUsers className="text-xl" />
              <span className="hidden sm:inline">Event</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;