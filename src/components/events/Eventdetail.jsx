// src/components/events/EventDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiClock, FiArrowLeft } from 'react-icons/fi';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // This would normally come from an API or context
  const event = {
    id: eventId,
    title: 'Tech Career Fair 2023',
    date: 'Oct 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Virtual',
    description: 'Join the largest tech career fair with top companies hiring for various positions.',
    longDescription: 'This career fair brings together the top tech companies in the industry looking to hire talented professionals. With over 50 companies participating, you\'ll have the opportunity to network with recruiters, learn about job openings, and even interview on the spot. Prepare your resume and portfolio to make the best impression!',
    attending: false,
    organizers: [
      { name: 'Tech Recruiters Association', role: 'Main Organizer' },
      { name: 'Local Tech Hub', role: 'Co-organizer' }
    ],
    requirements: 'Bring your resume, dress professionally, and prepare your elevator pitch'
  };

  const handleAttendEvent = () => {
    // Your attendance logic here
    console.log(`Attending event ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-purple-700 hover:text-purple-900 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">{event.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2 text-purple-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-2 text-purple-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2 text-purple-600" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-800 mb-3">About This Event</h2>
              <p className="text-gray-700 mb-4">{event.longDescription}</p>
              
              <h3 className="text-lg font-semibold text-purple-800 mt-6 mb-3">Organizers</h3>
              <ul className="space-y-2 mb-6">
                {event.organizers.map((org, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{org.name}</span> - {org.role}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-purple-800 mt-6 mb-3">Requirements</h3>
              <p className="text-gray-700">{event.requirements}</p>
            </div>

            <button
              onClick={handleAttendEvent}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                event.attending 
                  ? 'bg-purple-700 text-white hover:bg-purple-800' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {event.attending ? 'You\'re Attending' : 'RSVP for This Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;