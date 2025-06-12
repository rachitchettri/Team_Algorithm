// src/components/events/Events.js
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiArrowLeft, 
  FiMapPin, 
  FiClock, 
  FiUsers, 
  FiFilter,
  FiSearch,
  FiShare2,
  FiBookmark,
  FiTrendingUp
} from 'react-icons/fi';

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [attendingEvents, setAttendingEvents] = useState(new Set());
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Career Fair 2025',
      date: '2025-07-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual',
      description: 'Join the largest tech career fair with top companies hiring for various positions. Connect with recruiters from Google, Microsoft, Meta, and more.',
      category: 'career',
      attendees: 1250,
      price: 'Free',
      organizer: 'TechConnect',
      tags: ['Remote', 'Career', 'Networking'],
      featured: true
    },
    {
      id: 2,
      title: 'React Advanced Concepts Workshop',
      date: '2025-07-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      description: 'Deep dive into advanced React patterns with industry experts. Learn about performance optimization, custom hooks, and architectural patterns.',
      category: 'workshop',
      attendees: 85,
      price: '$49',
      organizer: 'DevMasters',
      tags: ['React', 'Frontend', 'Advanced'],
      featured: false
    },
    {
      id: 3,
      title: 'Networking Mixer for Professionals',
      date: '2025-08-05',
      time: '6:00 PM - 9:00 PM',
      location: 'Downtown Conference Center',
      description: 'Network with professionals from various industries in a relaxed setting. Includes dinner and drinks.',
      category: 'networking',
      attendees: 200,
      price: '$25',
      organizer: 'Professional Network',
      tags: ['In-Person', 'Networking', 'Social'],
      featured: false
    },
    {
      id: 4,
      title: 'AI & Machine Learning Summit',
      date: '2025-08-12',
      time: '9:00 AM - 6:00 PM',
      location: 'Tech Hub Convention Center',
      description: 'Explore the latest trends in AI and ML with keynotes from industry leaders and hands-on workshops.',
      category: 'conference',
      attendees: 800,
      price: '$150',
      organizer: 'AI Society',
      tags: ['AI', 'ML', 'Conference'],
      featured: true
    },
    {
      id: 5,
      title: 'Startup Pitch Competition',
      date: '2025-08-18',
      time: '1:00 PM - 8:00 PM',
      location: 'Innovation Center',
      description: 'Watch emerging startups pitch their ideas to top investors. $50K prize pool.',
      category: 'competition',
      attendees: 300,
      price: 'Free',
      organizer: 'StartupLab',
      tags: ['Startup', 'Investment', 'Competition'],
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'career', label: 'Career' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'networking', label: 'Networking' },
    { value: 'conference', label: 'Conferences' },
    { value: 'competition', label: 'Competitions' }
  ];

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  const handleAttendEvent = (eventId) => {
    setAttendingEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleBookmarkEvent = (eventId) => {
    setBookmarkedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleShareEvent = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href + `/${event.id}`
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`Check out this event: ${event.title} - ${window.location.href}/${event.id}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const EventCard = ({ event }) => (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 ${
        event.featured ? 'ring-2 ring-purple-300 shadow-purple-100' : ''
      }`}
      onClick={() => handleEventClick(event.id)}
    >
      {event.featured && (
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white text-xs font-bold px-4 py-2 flex items-center">
          <FiTrendingUp className="mr-2" />
          FEATURED EVENT
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start flex-1 min-w-0">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300 flex-shrink-0">
              <FiCalendar className="text-purple-700 text-xl" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg md:text-xl font-bold text-purple-800 group-hover:text-purple-900 transition-colors truncate">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500 font-medium">{formatDate(event.date)}</p>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBookmarkEvent(event.id);
            }}
            className={`p-2 rounded-full transition-all duration-200 flex-shrink-0 ml-2 ${
              bookmarkedEvents.has(event.id)
                ? 'bg-purple-100 text-purple-700 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            <FiBookmark className="text-base" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FiClock className="mr-2 text-purple-600 flex-shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiMapPin className="mr-2 text-purple-600 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiUsers className="mr-2 text-purple-600 flex-shrink-0" />
            <span>{event.attendees.toLocaleString()} attending</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-purple-800">{event.price}</span>
            <p className="text-xs text-gray-500 truncate max-w-[100px]">by {event.organizer}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShareEvent(event);
              }}
              className="p-2 rounded-full text-gray-500 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
              title="Share event"
            >
              <FiShare2 className="text-sm" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAttendEvent(event.id);
              }}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                attendingEvents.has(event.id)
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:shadow-md'
              }`}
            >
              {attendingEvents.has(event.id) ? 'Going' : 'RSVP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 font-sans text-gray-800">
      {/* Fixed Header to avoid nav overlap */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-purple-100 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiArrowLeft className="text-xl text-purple-700" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-purple-800">Upcoming Events</h1>
                <p className="text-gray-600 text-sm hidden sm:block">Discover amazing events happening near you</p>
              </div>
            </div>
            
            <div className="text-right hidden md:block">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-purple-700">{attendingEvents.size}</p>
                  <p className="text-xs text-gray-500">Attending</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-purple-700">{bookmarkedEvents.size}</p>
                  <p className="text-xs text-gray-500">Bookmarked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Mobile Stats */}
        <div className="flex justify-center space-x-8 mb-6 md:hidden">
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-700">{attendingEvents.size}</p>
            <p className="text-xs text-gray-500">Attending</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-700">{bookmarkedEvents.size}</p>
            <p className="text-xs text-gray-500">Bookmarked</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-purple-100">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search events, topics, or organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 text-gray-800 placeholder-gray-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-8 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white/90 min-w-[150px] text-gray-800"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {(searchTerm || filterCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                  }}
                  className="px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-gray-700 font-medium">
              <span className="text-purple-700 font-semibold">{filteredEvents.length}</span> events found
              {searchTerm && (
                <span className="text-gray-600"> for "<span className="font-medium">{searchTerm}</span>"</span>
              )}
            </p>
            {filterCategory !== 'all' && (
              <p className="text-sm text-gray-500 mt-1">
                in {categories.find(c => c.value === filterCategory)?.label}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">View:</span>
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
            : "space-y-4"
        }>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiCalendar className="text-3xl md:text-4xl text-purple-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">No events found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any events matching your criteria. Try adjusting your search terms or filters to discover more events.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;