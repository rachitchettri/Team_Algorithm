import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import MobileMenu from './MobileMenu';
import LeftSidebar from './LeftSidebar';
import MainFeed from './MainFeed';
import RightSidebar from './RightSidebar';
import MobileBottomNav from './MobileBottomNav';

const Home = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postType, setPostType] = useState('post');

  const [newCommentContent, setNewCommentContent] = useState({});
  const [showComments, setShowComments] = useState({});

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const [shareFeedback, setShareFeedback] = useState({});

  // Initialize with mock data
  useEffect(() => {
    const storedPosts = localStorage.getItem('eduConnectPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts(parsedPosts);
        const initialCommentContent = {};
        const initialShowComments = {};
        const initialShareFeedback = {};
        parsedPosts.forEach(post => {
          initialCommentContent[post.id] = '';
          initialShowComments[post.id] = false;
          initialShareFeedback[post.id] = '';
        });
        setNewCommentContent(initialCommentContent);
        setShowComments(initialShowComments);
        setShareFeedback(initialShareFeedback);
      } catch (e) {
        console.error("Failed to parse stored posts:", e);
        initializeMockData();
      }
    } else {
      initializeMockData();
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('eduConnectPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const initializeMockData = () => {
    const initialPosts = [
      {
        id: 1,
        user: {
          name: 'Alex Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          title: 'Software Engineer'
        },
        content: 'Just completed an advanced React course! Highly recommend it for anyone looking to level up their frontend skills.',
        likes: 24,
        comments: 8,
        shares: 3,
        time: '2h ago',
        tags: ['#education', '#react', '#webdev'],
        liked: false,
        commentsList: [
          { id: 101, user: { name: 'You', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }, content: 'Great job, Alex!', time: '1h ago' },
          { id: 102, user: { name: 'Balaram Gupta', avatar: 'https://randomuser.me/api/portraits/men/40.jpg' }, content: 'Awesome! Which course was it?', time: '45m ago' },
          { id: 103, user: { name: 'You', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }, content: 'I found it on Udemy, search for "React - The Complete Guide (incl Hooks, React Router, Redux)" by Maximilian Schwarzmüller.', time: '10m ago' },
        ]
      },
      {
        id: 2,
        user: {
          name: 'TechCorp Inc.',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          title: 'Hiring Manager'
        },
        content: 'We\'re hiring Senior Full Stack Developers! Remote positions available with competitive benefits. Check out our careers page for more details.',
        likes: 42,
        comments: 15,
        shares: 22,
        time: '5h ago',
        tags: ['#hiring', '#jobopportunity', '#remotework'],
        liked: false,
        commentsList: []
      },
      {
        id: 3,
        user: {
          name: 'Maria Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          title: 'UX Designer'
        },
        content: 'Sharing my latest design portfolio project - a complete redesign of an educational platform. Would love to hear your feedback!',
        likes: 37,
        comments: 12,
        shares: 5,
        time: '1d ago',
        tags: ['#design', '#portfolio', '#education'],
        liked: false,
        commentsList: [
          { id: 301, user: { name: 'You', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }, content: 'Looks fantastic, Maria!', time: '1h ago' },
        ]
      }
    ];
    setPosts(initialPosts);

    const initialCommentContent = {};
    initialPosts.forEach(post => {
      initialCommentContent[post.id] = '';
    });
    setNewCommentContent(initialCommentContent);

    const initialShowComments = {};
    initialPosts.forEach(post => {
      initialShowComments[post.id] = false;
    });
    setShowComments(initialShowComments);

    const initialShareFeedback = {};
    initialPosts.forEach(post => {
      initialShareFeedback[post.id] = '';
    });
    setShareFeedback(initialShareFeedback);
  };

  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechSolutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      posted: '1 day ago',
      saved: false
    },
    {
      id: 2,
      title: 'Educational Content Writer',
      company: 'LearnHub',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$50 - $70/hr',
      posted: '3 days ago',
      saved: false
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '1 week ago',
      saved: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Career Fair 2023',
      date: 'Oct 15, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual',
      attending: false
    },
    {
      id: 2,
      title: 'React Advanced Concepts Workshop',
      date: 'Oct 20, 2023',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      attending: false
    },
    {
      id: 3,
      title: 'Networking Mixer for Professionals',
      date: 'Nov 5, 2023',
      time: '6:00 PM - 9:00 PM',
      location: 'Downtown Conference Center',
      attending: false
    }
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: 'David Kim',
      title: 'Product Manager',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      mutualConnections: 5,
      connected: false
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'Data Scientist',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      mutualConnections: 3,
      connected: false
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      title: 'DevOps Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      mutualConnections: 7,
      connected: false
    }
  ];

  const learningRecommendations = [
    {
      id: 1,
      title: 'Advanced JavaScript Patterns',
      type: 'Course',
      duration: '12 hours',
      enrolled: false
    },
    {
      id: 2,
      title: 'Interview Preparation Guide',
      type: 'Resource',
      duration: '30 min read',
      read: false
    }
  ];

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim() === '') return;

    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      user: {
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        title: 'Web Developer'
      },
      content: newPostContent,
      likes: 0,
      comments: 0,
      shares: 0,
      time: 'Just now',
      tags: [],
      liked: false,
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowPostForm(false);
    setNewCommentContent(prev => ({ ...prev, [newPost.id]: '' }));
    setShowComments(prev => ({ ...prev, [newPost.id]: false }));
    setShareFeedback(prev => ({ ...prev, [newPost.id]: '' }));
  };

  const handleAddComment = (postId) => {
    const commentText = newCommentContent[postId]?.trim();
    if (commentText === '') return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.commentsList.length > 0 ? Math.max(...post.commentsList.map(c => c.id)) + 1 : 1,
          user: {
            name: 'You',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
          },
          content: commentText,
          time: 'Just now'
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment]
        };
      }
      return post;
    }));
    setNewCommentContent(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(currentContent);
  };

  const handleUpdateComment = (postId, commentId) => {
    if (editedCommentContent.trim() === '') return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsList: post.commentsList.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                content: editedCommentContent.trim(),
                time: 'Just now (edited)'
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));

    setEditingCommentId(null);
    setEditedCommentContent('');
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments - 1,
          commentsList: post.commentsList.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  const handleSharePost = useCallback(async (postId, content) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EduConnect Post',
          text: content,
          url: window.location.href,
        });
        setShareFeedback(prev => ({ ...prev, [postId]: 'Shared!' }));
        setTimeout(() => {
          setShareFeedback(prev => ({ ...prev, [postId]: '' }));
        }, 2000);
      } catch (error) {
        if (error.name === 'AbortError') {
          setShareFeedback(prev => ({ ...prev, [postId]: '' }));
        } else {
          setShareFeedback(prev => ({ ...prev, [postId]: 'Share failed!' }));
          setTimeout(() => {
            setShareFeedback(prev => ({ ...prev, [postId]: '' }));
          }, 2000);
          console.error('Error sharing:', error);
        }
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(content);
        setShareFeedback(prev => ({ ...prev, [postId]: 'Copied!' }));
        setTimeout(() => {
          setShareFeedback(prev => ({ ...prev, [postId]: '' }));
        }, 2000);
      } catch (err) {
        setShareFeedback(prev => ({ ...prev, [postId]: 'Failed to copy!' }));
        setTimeout(() => {
          setShareFeedback(prev => ({ ...prev, [postId]: '' }));
        }, 2000);
        console.error('Failed to copy text: ', err);
      }
    } else {
      setShareFeedback(prev => ({ ...prev, [postId]: 'Not supported!' }));
      setTimeout(() => {
        setShareFeedback(prev => ({ ...prev, [postId]: '' }));
      }, 2000);
    }
  }, []);

  const handleSaveJob = (jobId) => {
    console.log(`Job ${jobId} saved`);
  };

  const handleConnect = (userId) => {
    console.log(`Connected with user ${userId}`);
  };

  const handleAttendEvent = (eventId) => {
    console.log(`Attending event ${eventId}`);
  };

  const handleEnroll = (courseId) => {
    console.log(`Enrolled in course ${courseId}`);
  };

  const handleSeeAllJobs = () => {
    navigate('/recommended-jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setShowMobileMenu={setShowMobileMenu} 
      />

      {/* Mobile Search - shown only on mobile */}
      <div className="lg:hidden bg-white p-4 shadow-sm border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for jobs, courses, people..."
            className="w-full py-2 px-5 pr-12 rounded-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        <MobileMenu 
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          upcomingEvents={upcomingEvents}
          handleAttendEvent={handleAttendEvent}
        />

        <LeftSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          upcomingEvents={upcomingEvents}
          handleAttendEvent={handleAttendEvent}
        />

        <MainFeed 
          showPostForm={showPostForm}
          setShowPostForm={setShowPostForm}
          postType={postType}
          setPostType={setPostType}
          newPostContent={newPostContent}
          setNewPostContent={setNewPostContent}
          handleCreatePost={handleCreatePost}
          posts={posts}
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

        <RightSidebar 
          recommendedJobs={recommendedJobs}
          handleSaveJob={handleSaveJob}
          handleSeeAllJobs={handleSeeAllJobs}
          suggestedConnections={suggestedConnections}
          handleConnect={handleConnect}
          learningRecommendations={learningRecommendations}
          handleEnroll={handleEnroll}
        />
      </main>

      <MobileBottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
    </div>
  );
};

export default Home;