import CreatePost from './CreatePost';
import Post from './Post';
import Card from './Card';

const MainFeed = ({ 
  showPostForm, 
  setShowPostForm, 
  postType, 
  setPostType, 
  newPostContent, 
  setNewPostContent, 
  handleCreatePost,
  posts,
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
    <div className="lg:ml-80 w-150">

    <section className="flex-1">
      <CreatePost 
        showPostForm={showPostForm}
        setShowPostForm={setShowPostForm}
        postType={postType}
        setPostType={setPostType}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        handleCreatePost={handleCreatePost}
        />

      <div className="space-y-6">
        {posts.map(post => (
          <Post 
            key={post.id}
            post={post}
            handleLikePost={handleLikePost}
            toggleComments={toggleComments}
            handleSharePost={handleSharePost}
            shareFeedback={shareFeedback}
            newCommentContent={newCommentContent}
            setNewCommentContent={setNewCommentContent}
            showComments={showComments}
            handleAddComment={handleAddComment}
            editingCommentId={editingCommentId}
            setEditingCommentId={setEditingCommentId}
            editedCommentContent={editedCommentContent}
            setEditedCommentContent={setEditedCommentContent}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            />
          ))}
      </div>
    </section>
          </div>
  );
};

export default MainFeed;