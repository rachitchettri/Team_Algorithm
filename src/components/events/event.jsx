// src/components/events/Events.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';

const Events = () => {
  const navigate = useNavigate();
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Career Fair 2023',
      date: 'Oct 15, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual',
      description: 'Join the largest tech career fair with top companies hiring for various positions.',
      attending: false
    },
    {
      id: 2,
      title: 'React Advanced Concepts Workshop',
      date: 'Oct 20, 2023',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      description: 'Deep dive into advanced React patterns with industry experts.',
      attending: false
    },
    {
      id: 3,
      title: 'Networking Mixer for Professionals',
      date: 'Nov 5, 2023',
      time: '6:00 PM - 9:00 PM',
      location: 'Downtown Conference Center',
      description: 'Network with professionals from various industries in a relaxed setting.',
      attending: false
    }
  ];

  const handleAttendEvent = (eventId) => {
    // Your attendance logic here
    console.log(`Attending event ${eventId}`);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-purple-100 transition-colors duration-200"
          >
            <FiArrowLeft className="text-2xl text-purple-700" />
          </button>
          <h1 className="text-3xl font-bold text-purple-800">Upcoming Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FiCalendar className="text-purple-700 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-purple-800">{event.title}</h2>
                    <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-600 font-medium">{event.location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAttendEvent(event.id);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      event.attending 
                        ? 'bg-purple-700 text-white' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {event.attending ? 'Attending' : 'RSVP'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;