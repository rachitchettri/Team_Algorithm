import { useState, useEffect, useCallback } from 'react';
import {
  FiSearch, FiBookOpen, FiBriefcase, FiUsers,
  FiBell, FiMessageSquare, FiUser, FiX,
  FiHeart, FiShare2, FiMessageCircle, FiPlus,
  FiEdit, FiTrash2, FiSave, FiMoreHorizontal,
  FiCalendar, FiClock, FiMapPin, FiDollarSign
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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

  // Color theme variables
  const theme = {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  };

  // --- Persistence with localStorage ---
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

  // Card component for consistent styling
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <FiBookOpen className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Leap<span className="text-purple-600">&</span>Learn</h1>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 hover:bg-gray-100"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden lg:block relative w-1/3">
            <input
              type="text"
              placeholder="Search for jobs, courses, people..."
              className="w-full py-2 px-5 pr-12 rounded-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <button className="p-3 rounded-full hover:bg-gray-100 relative transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
              <FiBell className="text-xl text-gray-600" />
              <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
              <FiMessageSquare className="text-xl text-gray-600" />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-purple-500 transition-all duration-200"
              />
              <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-all duration-200">John Doe</span>
            </div>
          </div>
        </div>
      </header>

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
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" onClick={() => setShowMobileMenu(false)}></div>
        )}

        {/* Left Sidebar - Mobile */}
        <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${showMobileMenu ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
          <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
              <FiX className="text-2xl text-gray-600" />
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover border-2 border-purple-500"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-600">Web Developer</p>
              </div>
            </div>
            <nav className="mb-8">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => { setActiveTab('feed'); setShowMobileMenu(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'feed' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiUsers className="text-xl" />
                    <span>My Feed</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveTab('learning'); setShowMobileMenu(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'learning' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiBookOpen className="text-xl" />
                    <span>Learning</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveTab('jobs'); setShowMobileMenu(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'jobs' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiBriefcase className="text-xl" />
                    <span>Jobs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveTab('network'); setShowMobileMenu(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'network' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiUsers className="text-xl" />
                    <span>Network</span>
                  </button>
                </li>
              </ul>
            </nav>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                        <FiCalendar className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <FiClock className="text-gray-500" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <FiMapPin className="text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                        <button
                          onClick={() => handleAttendEvent(event.id)}
                          className={`mt-3 text-sm font-medium px-4 py-1.5 rounded-full ${event.attending ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'} transition-colors duration-200`}
                        >
                          {event.attending ? 'Cancel RSVP' : 'RSVP'}
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <Card className="p-6 mb-6 sticky top-24">
            <div className="flex items-center space-x-4 mb-5">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover border-3 border-purple-500 shadow-sm"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-600">Web Developer</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <p className="text-base text-gray-600 flex justify-between mb-2">
                <span>Profile completeness</span>
                <span className="font-semibold text-purple-600">75%</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                Complete Profile
              </button>
            </div>
          </Card>

          <Card className="p-6 sticky top-[240px]">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('feed')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'feed' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiUsers className="text-xl" />
                    <span>My Feed</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('learning')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'learning' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiBookOpen className="text-xl" />
                    <span>Learning</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'jobs' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiBriefcase className="text-xl" />
                    <span>Jobs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('network')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'network' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                  >
                    <FiUsers className="text-xl" />
                    <span>Network</span>
                  </button>
                </li>
              </ul>
            </nav>
          </Card>

          <Card className="p-6 mt-6 sticky top-[500px]">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <FiClock className="text-gray-500" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <FiMapPin className="text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <button
                    onClick={() => handleAttendEvent(event.id)}
                    className={`mt-3 text-sm font-medium px-4 py-1.5 rounded-full ${event.attending ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'} transition-colors duration-200`}
                  >
                    {event.attending ? 'Cancel RSVP' : 'RSVP'}
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200">
              See all events
            </button>
          </Card>
        </aside>

        {/* Main Feed */}
        <section className="flex-1">
          {/* Create Post */}
          <Card className="p-6 mb-6">
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
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <Card key={post.id} className="p-6">
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

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h5 className="font-bold text-lg text-gray-800 mb-4">Comments ({post.comments})</h5>
                    <div className="space-y-4 mb-5">
                      {post.commentsList.length === 0 ? (
                        <p className="text-sm text-gray-500 p-3 bg-gray-100 rounded-lg italic">No comments yet. Be the first to comment!</p>
                      ) : (
                        post.commentsList.map(comment => (
                          <div key={comment.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
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
                                            handleUpdateComment(post.id, comment.id);
                                        }
                                    }}
                                  />
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleUpdateComment(post.id, comment.id)}
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
                                    onClick={() => handleEditComment(comment.id, comment.content)}
                                    className="text-xs text-purple-600 font-medium hover:underline flex items-center space-x-1 transition-colors duration-200"
                                  >
                                    <FiEdit className="text-sm" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                    className="text-xs text-red-600 font-medium hover:underline flex items-center space-x-1 transition-colors duration-200"
                                  >
                                    <FiTrash2 className="text-sm" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {/* Comment Input */}
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
                        value={newCommentContent[post.id] || ''}
                        onChange={(e) => setNewCommentContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddComment(post.id);
                            }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-sm transition-all duration-200"
                        aria-label="Add comment"
                      >
                        <FiPlus className="text-xl" />
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          {/* Recommended Jobs */}
          <Card className="p-6 mb-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800">Recommended Jobs</h3>
              <button
                onClick={handleSeeAllJobs}
                className="text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200"
              >
                See all
              </button>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 cursor-pointer group transition-all duration-200 hover:shadow-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200 text-base">{job.title}</h4>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className="text-gray-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={job.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{job.company} • {job.location}</p>
                  <div className="flex items-center space-x-2 text-xs mb-2">
                    <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">{job.type}</span>
                    <div className="flex items-center space-x-1 text-gray-600 font-medium">
                      <FiDollarSign className="text-gray-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{job.posted}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggested Connections */}
          <Card className="p-6 sticky top-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800">Suggested Connections</h3>
              <button className="text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200">See all</button>
            </div>
            <div className="space-y-4">
              {suggestedConnections.map(connection => (
                <div key={connection.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={connection.avatar}
                      alt={connection.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-purple-300"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{connection.name}</h4>
                      <p className="text-sm text-gray-500">{connection.title}</p>
                      <p className="text-xs text-purple-600">{connection.mutualConnections} mutual connections</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConnect(connection.id)}
                    className={`p-2 rounded-full transition-all duration-200 ${connection.connected ? 'bg-purple-100 text-purple-700' : 'text-purple-700 hover:bg-purple-100'}`}
                  >
                    {connection.connected ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <FiPlus className="text-xl" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Recommendations */}
          <Card className="p-6 mt-6 sticky top-[800px]">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Learning Recommendations</h3>
            <div className="space-y-4">
              {learningRecommendations.map(item => (
                <div key={item.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="h-14 w-14 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-700">
                    <FiBookOpen className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.type} • {item.duration}</p>
                    <button
                      onClick={() => item.type === 'Course' ? handleEnroll(item.id) : console.log(`Read ${item.id}`)}
                      className={`mt-2 text-sm font-medium px-4 py-1.5 rounded-full ${item.type === 'Course' ? (item.enrolled ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700') : (item.read ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700')} transition-colors duration-200`}
                    >
                      {item.type === 'Course' ? (item.enrolled ? 'Enrolled' : 'Enroll now') : (item.read ? 'Read' : 'Read now')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'feed' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
          >
            <FiUsers className="text-2xl" />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'learning' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
          >
            <FiBookOpen className="text-2xl" />
            <span className="text-xs mt-1">Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'jobs' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
          >
            <FiBriefcase className="text-2xl" />
            <span className="text-xs mt-1">Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'network' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
          >
            <FiUsers className="text-2xl" />
            <span className="text-xs mt-1">Network</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600 rounded-lg hover:text-purple-700">
            <FiUser className="text-2xl" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;